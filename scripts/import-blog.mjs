// Medium (Veri Jurnali) ve NewsLabTurkey'deki yazıları src/blog/ altına Markdown olarak aktarır.
// GitHub Actions tarafından haftalık çalıştırılır (.github/workflows/import-blog.yml); elle de çalıştırılabilir:
//   node scripts/import-blog.mjs            → yeni yazıları ekler
//   node scripts/import-blog.mjs --dry-run  → sadece ne ekleneceğini listeler
//   node scripts/import-blog.mjs --all      → eski Medium yazılarını da etiket beslemelerinden arar (ilk aktarım için)
//   node scripts/import-blog.mjs --check-links → aktarılmış tüm yazılardaki ölü bağlantıları yeniden kontrol eder
//
// - Daha önce aktarılmış yazılar (original_url veya başlık eşleşmesi) atlanır; elle yapılan düzenlemeler korunur.
// - Siteye alınmaması istenen yazılar scripts/import-blog-skip.json'daki adresleriyle atlanır.
// - Aktarılan yazılarda birbirine verilen bağlantılar sitedeki karşılıklarına çevrilir,
//   ölü bağlantılar (404/410/alan adı yok) Wayback Machine arşiv kopyasıyla değiştirilir.
// - Medium'da da bulunan NewsLabTurkey yazıları içerik benzerliğiyle tespit edilip atlanır.
// - Medium RSS yalnızca son 10 yazıyı verir; eski yazılar --all ile etiket beslemeleri taranarak bulunur.
//   Bu tarama onlarca istek attığından Medium'un hız sınırına takılabilir, haftalık çalışmada kullanılmaz.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const BLOG_DIR = new URL("../src/blog/", import.meta.url);
const SKIP_PATH = new URL("./import-blog-skip.json", import.meta.url);
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";
const MEDIUM_FEEDS = ["https://medium.com/feed/verijurnali", "https://medium.com/feed/@sadettindemirel"];
const MEDIUM_TAG_FEED = "https://medium.com/feed/verijurnali/tagged/"; // tüm yazılar Veri Jurnali yayınında
// Ana beslemelerde görünmeyen eski yazılara ulaşmak için taramaya bu etiketlerden de başlanır
const MEDIUM_SEED_TAGS = ["rstats", "r", "r-programming", "data-journalism", "veri-gazeteciligi", "dataviz", "data-visualization", "tableau", "çeviri", "open-data", "gazetecilik", "journalism"];
const NEWSLAB_FEED = "https://www.newslabturkey.org/author/sadettindemirel/feed/";
const AUTHOR = "Sadettin Demirel";
const DUPLICATE_THRESHOLD = 0.35; // kelime üçlüleri Jaccard benzerliği
const DRY_RUN = process.argv.includes("--dry-run");
const CRAWL_TAGS = process.argv.includes("--all");
const CHECK_ALL_LINKS = process.argv.includes("--check-links");

const xml = new XMLParser({ ignoreAttributes: true, cdataPropName: false, processEntities: true, htmlEntities: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Medium kısa sürede çok istek gelince 429 döner; bekleyip yeniden dene
async function fetchFeed(url, delay = 1500) {
    let res;
    for (let attempt = 0; attempt < 5; attempt++) {
        if (url.includes("medium.com")) await sleep(delay);
        res = await fetch(url, { headers: { "User-Agent": UA } });
        if (res.status !== 429) break;
        await sleep(60000 * 2 ** attempt); // 1, 2, 4, 8, 16 dk
    }
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    const items = xml.parse(await res.text())?.rss?.channel?.item ?? [];
    return (Array.isArray(items) ? items : [items]).map(item => ({
        title: String(item.title).trim(),
        link: String(item.link).split("?")[0],
        guid: String(item.guid),
        date: new Date(item.pubDate),
        tags: [item.category ?? []].flat().map(String),
        html: item["content:encoded"] ?? ""
    }));
}

// Medium aynı yazıyı farklı beslemelerde farklı tarihlerle verebiliyor (yayına eklenme tarihi); en eskisi asıl tarihtir
async function collectMedium() {
    const posts = new Map();
    const add = items => {
        let added = 0;
        for (const item of items) {
            const prev = posts.get(item.guid);
            if (!prev) { posts.set(item.guid, item); added++; continue; }
            if (item.date < prev.date) prev.date = item.date;
            prev.tags = [...new Set([...prev.tags, ...item.tags])];
        }
        return added;
    };
    for (const url of MEDIUM_FEEDS) add(await fetchFeed(url));
    if (!CRAWL_TAGS) return [...posts.values()];

    const triedTags = new Set();
    for (let pending = [...new Set([...MEDIUM_SEED_TAGS, ...allTags(posts)])]; pending.length; pending = allTags(posts).filter(t => !triedTags.has(t))) {
        for (const tag of pending) {
            triedTags.add(tag);
            try { add(await fetchFeed(MEDIUM_TAG_FEED + encodeURIComponent(tag), 5000)); }
            catch (err) { if (/HTTP (429|5\d\d)/.test(err.message)) throw err; } // olmayan etiketin beslemesi yoktur
        }
    }
    return [...posts.values()];
}

const allTags = posts => [...new Set([...posts.values()].flatMap(p => p.tags))];

async function collectNewslab() {
    const posts = [];
    for (let page = 1; ; page++) {
        let items;
        try { items = await fetchFeed(`${NEWSLAB_FEED}?paged=${page}`); } catch { break; } // son sayfadan sonrası 404 döner
        if (!items.length) break;
        posts.push(...items);
    }
    return posts;
}

// ---------- HTML temizliği ve Markdown dönüşümü ----------

function cleanHtml(html, source) {
    // WordPress görsel/stil öznitelikleri (Flourish'in data-src'si korunur)
    if (source === "newslab") html = html.replace(/\s(?:srcset|sizes|decoding|style)="[^"]*"/g, "")
        .replace(/\sclass="(?!flourish-embed|pagedtable|r\b)[^"]*"/g, "");

    let h = html
        .replace(/<img[^>]*medium\.com\/_\/stat[^>]*>/g, "")                 // Medium izleme pikseli
        .replace(/<hr\s*\/?><p>(?:(?!<p>).)*was originally published in[\s\S]*$/, "") // "originally published" altbilgisi
        .replace(/<button[\s\S]*?<\/button>/g, "")                            // R Markdown "Hide" düğmeleri
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<iframe[^>]*(?:gfycat\.com|workbenchdata\.com)[^>]*>[\s\S]*?<\/iframe>/g, ""); // Gfycat (2023) ve Workbench (2021) kapandı

    // Embedly sarmalayıcısını kaldır, asıl gömme adresini kullan (Medium iframe içine yedek bağlantı koyar)
    h = h.replace(/<iframe[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/iframe>/g, (_, src) => {
        const embedly = src.match(/^https:\/\/cdn\.embedly\.com\/widgets\/media\.html\?src=([^&]+)/);
        return embed(embedly ? decodeURIComponent(embedly[1]) : src.replace(/&amp;/g, "&"));
    });
    // Flourish script gömmeleri → iframe
    h = h.replace(/<div class="flourish-embed[^"]*" data-src="([^"]+)"[^>]*>[\s\S]*?<\/div>/g,
        (_, src) => embed(`https://flo.uri.sh/${src}/embed`));

    // Kod bloklarında <br> satır sonudur, biçimlendirme etiketleri gereksizdir
    h = h.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, (_, attrs, body) => {
        const lang = (attrs.match(/class="(\w+)"/) || [])[1] || "";
        const code = body.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "");
        return `<pre data-lang="${lang}">${code}</pre>`;
    });

    // R Markdown tablolarının başlığındaki sütun türü etiketleri (<chr>, <dbl>)
    h = h.replace(/<div class="pagedtable-header-type">[\s\S]*?<\/div>/g, "")
        .replace(/<div class="pagedtable-header-name">([\s\S]*?)<\/div>/g, "$1")
        .replace(/<(th|td)([^>]*)>([\s\S]*?)<\/\1>/g, (_, tag, attrs, cell) => `<${tag}${attrs}>${cell.replace(/<\/?div[^>]*>/g, " ").replace(/\s+/g, " ").trim()}</${tag}>`);

    h = h.replace(/<span data-mce-type="bookmark"[^>]*>[\s\S]*?<\/span>/g, "")           // WordPress editör kalıntısı
        .replace(/<p>\s*<\/p>/g, "");

    return h;
}

function embed(src) {
    return `<div class="embed-container"><iframe src="${src.replace(/"/g, "&quot;")}" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen></iframe></div>`;
}

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*" });
turndown.use(gfm);
turndown.keep(node => node.nodeName === "DIV" && node.classList?.contains("embed-container"));
turndown.addRule("codeBlock", {
    filter: node => node.nodeName === "PRE",
    replacement: (_, node) => {
        const code = node.textContent.replace(/\n+$/, "");
        return `\n\n\`\`\`${node.getAttribute("data-lang") || ""}\n${code}\n\`\`\`\n\n`;
    }
});
turndown.addRule("figure", {
    filter: "figure",
    replacement: (content, node) => {
        const img = node.querySelector("img");
        const caption = node.querySelector("figcaption")?.textContent.trim();
        if (!img) return `\n\n${content}\n\n`;
        const md = `![${(caption || img.getAttribute("alt") || "").replace(/[\[\]]/g, "")}](${img.getAttribute("src")})`;
        return `\n\n${md}${caption ? `\n*${turndown.escape(caption)}*` : ""}\n\n`;
    }
});

// Kaynaklar ara başlıkları h3/h4 olarak verir; sayfa başlığı h1 olduğundan en üst ara başlık ## olacak şekilde kaydır
function toMarkdown(html, source) {
    let md = turndown.turndown(cleanHtml(html, source));
    const levels = [...md.matchAll(/^(#{1,6}) /gm)].map(m => m[1].length);
    const shift = levels.length ? Math.min(...levels) - 2 : 0;
    md = md.replace(/^(#{1,6}) /gm, (_, hashes) => "#".repeat(Math.min(6, Math.max(2, hashes.length - shift))) + " ");
    return md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

// ---------- Kod blokları ve bağlantılar (Markdown üzerinde, mevcut yazılara da uygulanabilir) ----------

// Kaynaklar kod dilini çoğunlukla belirtmez; sözdizimi renklendirmesi için tahmin et
function guessLanguage(code) {
    if (/<-|%>%|\blibrary\(|install\.packages\(|\bggplot\(|\bc\(|\bdata\.frame\(/.test(code)) return "r";
    if (/^\s*(import |from \w+ import |def |print\()/m.test(code)) return "python";
    if (/^\s*SELECT\b[\s\S]*\bFROM\b/m.test(code)) return "sql"; // büyük harf şart: dplyr'de select() var
    return "";
}

// Açılış/kapanış çitlerini sırayla eşleştir; düz regex kapanış çitini yeni blok sanabilir.
// Tek satırlık bloklar (select(df, a)) tahmin edilemez; yazıdaki diğer blokların dili kullanılır.
function labelCodeBlocks(md) {
    const lines = md.split("\n");
    const blocks = [];
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].startsWith("```")) continue;
        const close = lines.findIndex((line, j) => j > i && line === "```");
        if (close === -1) break;
        blocks.push({ open: i, lang: lines[i].slice(3) || guessLanguage(lines.slice(i + 1, close).join("\n")) });
        i = close;
    }
    const fallback = blocks.find(b => b.lang)?.lang || "";
    for (const b of blocks) if (lines[b.open] === "```" && (b.lang || fallback)) lines[b.open] = "```" + (b.lang || fallback);
    return lines.join("\n");
}

// Markdown bağlantılarını kod blokları dışında dönüştür
function mapLinks(md, fn) {
    return md.split(/(^```[\s\S]*?^```$)/m).map((part, i) => i % 2 ? part
        : part.replace(/(!?)\[([^\]]*)\]\((\S+?)\)/g, (m, bang, text, url) => bang ? m : fn(text, url) ?? m)).join("");
}

const mediumId = url => /medium\.com\//.test(url) && (url.split(/[?#]/)[0].match(/[-/]([0-9a-f]{10,12})\/?$/) || [])[1];
const newslabSlug = url => /newslabturkey\.org\//.test(url) && url.split(/[?#]/)[0].replace(/\/$/, "").split("/").pop();

// Yazım hatası kaynaklı bozuk bağlantılar ve kendi yazılarına giden bağlantılar
function fixLinks(md, localUrl) {
    return mapLinks(md, (text, url) => {
        if (/^https?:\/\/(127\.0\.0\.1|localhost)\b/.test(url)) return `\`${url}\``;  // R kurulum anlatımındaki yerel adres
        let fixed = url.replace(/^http:\/\/(https?:\/\/)/, "$1")                       // http://https://...
            .replace(/^http:\/\/newslabturkey\.org%27da\/?$/, "https://www.newslabturkey.org/");
        fixed = localUrl(fixed) || fixed;
        return fixed === url ? null : `[${text}](${fixed})`;
    });
}

// 403/429/5xx çoğunlukla bot engelidir, bağlantı tarayıcıda çalışır; yalnızca kesin ölü olanlar arşivlenir
async function isDead(url) {
    try {
        let res = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
        if (res.status === 405 || res.status === 404) {
            res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
        }
        return res.status === 404 || res.status === 410;
    } catch (err) {
        return ["ENOTFOUND", "ECONNREFUSED", "EAI_AGAIN"].includes(err.cause?.code);
    }
}

// Wayback "available" API'si sık sık boş döndüğünden CDX dizininde yazının tarihine en yakın sağlam kopya aranır
async function waybackUrl(url, date) {
    const ts = date.toISOString().slice(0, 10).replace(/-/g, "");
    const query = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(url)}&filter=statuscode:200&closest=${ts}&sort=closest&limit=1&fl=timestamp`;
    try {
        const snapshot = (await (await fetch(query, { signal: AbortSignal.timeout(60000) })).text()).trim();
        return /^\d{14}$/.test(snapshot) ? `https://web.archive.org/web/${snapshot}/${url}` : null;
    } catch { return null; }
}

async function archiveDeadLinks(md, date) {
    const urls = new Set();
    mapLinks(md, (_, url) => { if (/^https?:/.test(url) && !url.includes("web.archive.org")) urls.add(url); });
    const replacements = new Map();
    const queue = [...urls];
    await Promise.all(Array.from({ length: 3 }, async () => {
        for (let url; (url = queue.shift());) {
            if (!(await isDead(url))) continue;
            const archived = await waybackUrl(url, date);
            console.log(`    ölü bağlantı: ${url} → ${archived || "arşivde yok, olduğu gibi bırakıldı"}`);
            if (archived) replacements.set(url, archived);
        }
    }));
    return mapLinks(md, (text, url) => replacements.has(url) ? `[${text}](${replacements.get(url)})` : null);
}

// ---------- Yardımcılar ----------

const plainText = html => html.replace(/<pre[\s\S]*?<\/pre>/g, " ").replace(/<[^>]+>/g, " ")
    .replace(/&[#\w]+;/g, " ").replace(/\s+/g, " ").trim();

function shingles(text) {
    const words = text.toLocaleLowerCase("tr").match(/\p{L}+/gu) || [];
    const set = new Set();
    for (let i = 0; i + 2 < words.length; i++) set.add(words.slice(i, i + 3).join(" "));
    return set;
}

function similarity(a, b) {
    let common = 0;
    for (const s of a) if (b.has(s)) common++;
    return common / Math.min(a.size, b.size || 1);
}

const normalizeTitle = t => t.toLocaleLowerCase("tr").replace(/[’'"“”]/g, "").replace(/\s*[—–-]\s*\(?çeviri\)?$/, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

function slugify(title) {
    const map = { ç: "c", ğ: "g", ı: "i", i̇: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
    return title.toLocaleLowerCase("tr").replace(/[çğıöşüâîû]/g, c => map[c]).normalize("NFKD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").split("-").slice(0, 8).join("-");
}

function excerptOf(html) {
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => plainText(m[1]));
    const text = paragraphs.find(p => p.length > 80) || paragraphs[0] || "";
    if (text.length <= 220) return text;
    return text.slice(0, 220).replace(/\s+\S*$/, "") + "…";
}

function firstImage(html) {
    const src = (html.match(/<img[^>]*src="([^"]+)"/) || [])[1];
    return src && !src.includes("medium.com/_/stat") ? src : "";
}

// Medium etiketleri slug biçimindedir (data-journalism); okunur hale getir
function prettyTags(tags, source) {
    const labels = tags.map(t => source === "medium"
        ? t.split("-").map(w => w.charAt(0).toLocaleUpperCase("tr") + w.slice(1)).join(" ")
        : t);
    return [...new Set(labels)].filter(t => t.length > 1).slice(0, 5).join(", ");
}

const yamlString = s => JSON.stringify(s); // JSON dizesi geçerli bir YAML dizesidir

function frontMatter(post) {
    return [
        "---",
        `title: ${yamlString(post.title)}`,
        `date: ${post.date.toISOString().slice(0, 10)}`,
        `author: ${AUTHOR}`,
        `excerpt: ${yamlString(post.excerpt)}`,
        post.thumbnail && `thumbnail: ${post.thumbnail}`,
        post.tagsDisplay && `tags_display: ${yamlString(post.tagsDisplay)}`,
        `original_url: ${post.link}`,
        `original_source: ${post.sourceName}`,
        "---"
    ].filter(Boolean).join("\n") + "\n";
}

async function existingPosts() {
    const files = (await readdir(BLOG_DIR)).filter(f => f.endsWith(".md"));
    const posts = [];
    for (const file of files) {
        const text = await readFile(new URL(file, BLOG_DIR), "utf8");
        const fm = text.split(/^---$/m)[1] || "";
        const title = (fm.match(/^title:\s*([\s\S]*?)\n(?=\w+:)/m) || [])[1]?.replace(/\n\s+/g, " ").replace(/^"|"$/g, "") || "";
        const body = text.split(/^---$/m).slice(2).join("---").replace(/```[\s\S]*?```/g, " ").replace(/\]\([^)]*\)/g, "] ");
        const date = new Date((fm.match(/^date:\s*(\S+)/m) || [])[1]);
        posts.push({ slug: file.replace(/\.md$/, ""), title, date, url: (fm.match(/^original_url:\s*(\S+)/m) || [])[1] || "", shingles: shingles(body) });
    }
    return posts;
}

// ---------- Ana akış ----------

const skip = new Set(JSON.parse(await readFile(SKIP_PATH, "utf8").catch(() => "[]")));
const [medium, newslab, existing] = await Promise.all([collectMedium(), collectNewslab(), existingPosts()]);
console.log(`Medium: ${medium.length} yazı, NewsLabTurkey: ${newslab.length} yazı, sitede: ${existing.length} yazı`);

// NewsLabTurkey yazısının kopyası Medium beslemesinde ya da (beslemeden düşmüş eski Medium yazısı olarak) sitede olabilir
const twins = [
    ...medium.map(p => ({ post: p, title: p.title, shingles: shingles(plainText(p.html)) })),
    ...existing.map(p => ({ slug: p.slug, title: p.title, shingles: p.shingles }))
];
const candidates = [];
const newslabAliases = []; // [NewsLabTurkey adresi, sitedeki kopyası]

for (const post of newslab) {
    const sh = shingles(plainText(post.html));
    const scores = twins.map(t => normalizeTitle(t.title) === normalizeTitle(post.title) ? 1 : similarity(sh, t.shingles));
    const best = Math.max(...scores);
    const twin = twins[scores.indexOf(best)];
    if (best >= DUPLICATE_THRESHOLD) {
        // Medium'a sonradan taşınan yazılarda asıl yayın tarihi NewsLabTurkey'deki tarihtir
        if (twin.post && post.date < twin.post.date) twin.post.date = post.date;
        newslabAliases.push([post.link, twin]);
        if (DRY_RUN) console.log(`  ↳ zaten var (%${Math.round(best * 100)}): "${post.title}" ≈ "${twin.title}"`);
        continue;
    }
    if (DRY_RUN) console.log(`  · en yakın yazı %${Math.round(best * 100)}: "${post.title}" ≈ "${twin.title}"`);
    candidates.push({ ...post, source: "newslab", sourceName: "NewsLabTurkey" });
}
for (const post of medium) candidates.push({ ...post, source: "medium", sourceName: "Medium" });

const usedSlugs = new Set(existing.map(p => p.slug));
const created = [];

for (const post of candidates.sort((a, b) => a.date - b.date)) {
    if (skip.has(post.link)) continue;
    const known = existing.find(p => p.url === post.link || normalizeTitle(p.title) === normalizeTitle(post.title));
    if (known) {
        const twin = twins.find(t => t.post?.guid === post.guid);
        if (twin) twin.slug = known.slug; // NewsLabTurkey kopyasına verilen bağlantılar bu yazıya yönlensin
        continue;
    }

    let slug = slugify(post.title);
    for (let n = 2; usedSlugs.has(slug); n++) slug = `${slugify(post.title)}-${n}`;
    usedSlugs.add(slug);
    const twin = twins.find(t => t.post?.guid === post.guid);
    if (twin) twin.slug = slug;

    const file = frontMatter({
        ...post,
        excerpt: excerptOf(post.html),
        thumbnail: firstImage(post.html),
        tagsDisplay: prettyTags(post.tags, post.source)
    }) + toMarkdown(post.html, post.source);

    console.log(`${DRY_RUN ? "[deneme] " : ""}+ ${slug}.md  (${post.sourceName}, ${post.date.toISOString().slice(0, 10)})`);
    created.push({ slug, date: post.date, url: post.link, file });
}

// Aktarılmış yazıların birbirine verdiği bağlantıları sitedeki adreslere çevir
const allPosts = [...existing, ...created];
const byMediumId = new Map(), byNewslabSlug = new Map();
for (const p of allPosts) {
    if (mediumId(p.url)) byMediumId.set(mediumId(p.url), p.slug);
    if (newslabSlug(p.url)) byNewslabSlug.set(newslabSlug(p.url), p.slug);
}
for (const [url, twin] of newslabAliases) if (twin.slug) byNewslabSlug.set(newslabSlug(url), twin.slug);
const localUrl = url => {
    const slug = byMediumId.get(mediumId(url)) || byNewslabSlug.get(newslabSlug(url));
    return slug && `/blog/${slug}/`;
};

let changed = 0;
for (const post of allPosts) {
    if (!post.url) continue; // sitede yazılmış (aktarılmamış) yazılara dokunma
    const isNew = created.includes(post);
    const path = new URL(`${post.slug}.md`, BLOG_DIR);
    const text = isNew ? post.file : await readFile(path, "utf8");
    const end = text.indexOf("\n---", 3) + 4;
    let body = fixLinks(labelCodeBlocks(text.slice(end)), localUrl);
    if (isNew || CHECK_ALL_LINKS) body = await archiveDeadLinks(body, post.date);
    const result = text.slice(0, end) + body;
    if (DRY_RUN || (!isNew && result === text)) continue;
    await writeFile(path, result);
    if (!isNew) changed++;
}

console.log(created.length ? `${created.length} yeni yazı ${DRY_RUN ? "bulundu" : "eklendi"}.` : "Yeni yazı yok.");
if (changed) console.log(`${changed} mevcut yazıda bağlantı/kod bloğu güncellendi.`);
