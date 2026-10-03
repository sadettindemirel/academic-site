// Google Scholar ve Scopus atıf/doküman sayılarını çekip src/_data/metrics.json'a yazar.
// GitHub Actions tarafından haftalık çalıştırılır (.github/workflows/update-metrics.yml).
// Bir kaynak başarısız olursa o kaynağın eski değerleri korunur.
//
// Ortam değişkenleri (GitHub > Settings > Secrets and variables > Actions):
//   SCOPUS_API_KEY  — https://dev.elsevier.com adresinden ücretsiz alınır (Scopus için gerekli)
//   SERPAPI_KEY     — opsiyonel; Google Scholar doğrudan erişimi engellerse yedek olarak kullanılır

import { readFile, writeFile } from "node:fs/promises";

const SCHOLAR_ID = "wQpGDFQAAAAJ";
const SCOPUS_ID = "57221689330";
const METRICS_PATH = new URL("../src/_data/metrics.json", import.meta.url);
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";

async function fetchScholarDirect() {
    const base = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&pagesize=100`;
    const res = await fetch(base, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // Sağdaki tablo sırası: atıf (tümü, son 5 yıl), h-indeks (tümü, ...), i10-indeks (tümü, ...)
    const stats = [...html.matchAll(/class="gsc_rsb_std">(\d+)</g)].map(m => Number(m[1]));
    if (stats.length < 6) throw new Error("istatistik tablosu bulunamadı (CAPTCHA olabilir)");

    let documents = (html.match(/class="gsc_a_tr"/g) || []).length;
    for (let start = 100; documents === start; start += 100) {
        const page = await fetch(`${base}&cstart=${start}`, { headers: { "User-Agent": UA } }).then(r => r.text());
        documents += (page.match(/class="gsc_a_tr"/g) || []).length;
    }

    return { citations: stats[0], h_index: stats[2], i10_index: stats[4], documents, by_year: parseScholarHistogram(html) };
}

// Yıllara göre atıf grafiği: yıllar soldan sağa sıralı, çubukların z-index'i sağdan sola 1'den başlar.
// Atıf almayan yılların çubuğu yoktur, onlar 0 olarak eklenir.
function parseScholarHistogram(html) {
    const years = [...html.matchAll(/class="gsc_g_t"[^>]*>(\d{4})</g)].map(m => Number(m[1]));
    const counts = new Map();
    for (const m of html.matchAll(/class="gsc_g_a"[^>]*z-index:(\d+)[^>]*>\s*<span class="gsc_g_al">(\d+)</g)) {
        counts.set(years[years.length - Number(m[1])], Number(m[2]));
    }
    return years.map(year => ({ year, citations: counts.get(year) || 0 }));
}

// SerpApi atıf almayan yılları listelemez; aradaki yılları 0 ile doldur
function fillYearGaps(graph) {
    if (!graph.length) return [];
    const counts = new Map(graph.map(g => [g.year, g.citations]));
    const years = graph.map(g => g.year);
    const result = [];
    for (let year = Math.min(...years); year <= Math.max(...years); year++) {
        result.push({ year, citations: counts.get(year) || 0 });
    }
    return result;
}

async function fetchScholarSerpApi(key) {
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${SCHOLAR_ID}&hl=en&num=100&api_key=${key}`;
    const data = await fetch(url).then(r => r.json());
    if (data.error) throw new Error(data.error);
    const table = data.cited_by?.table || [];
    const pick = name => table.find(row => row[name])?.[name]?.all;
    return {
        citations: pick("citations"),
        h_index: pick("h_index"),
        i10_index: pick("i10_index"),
        documents: (data.articles || []).length,
        by_year: fillYearGaps(data.cited_by?.graph || [])
    };
}

async function fetchScopus(key) {
    const headers = { "X-ELS-APIKey": key, Accept: "application/json" };

    // 1) Yazar API'si (kurumsal yetki gerektirebilir)
    const authorRes = await fetch(`https://api.elsevier.com/content/author/author_id/${SCOPUS_ID}?view=METRICS`, { headers });
    if (authorRes.ok) {
        const author = (await authorRes.json())["author-retrieval-response"]?.[0];
        if (author?.coredata) {
            return {
                citations: Number(author.coredata["citation-count"]),
                h_index: Number(author["h-index"]),
                documents: Number(author.coredata["document-count"])
            };
        }
    }

    // 2) Yedek: Scopus Search API ile yayınları listeleyip atıfları topla
    const counts = [];
    let total = Infinity;
    for (let start = 0; start < total; start += 25) {
        const url = `https://api.elsevier.com/content/search/scopus?query=AU-ID(${SCOPUS_ID})&field=citedby-count&count=25&start=${start}`;
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const results = (await res.json())["search-results"];
        total = Number(results["opensearch:totalResults"]);
        for (const entry of results.entry || []) {
            if (entry["citedby-count"] !== undefined) counts.push(Number(entry["citedby-count"]));
        }
    }
    counts.sort((a, b) => b - a);
    return {
        citations: counts.reduce((sum, c) => sum + c, 0),
        h_index: counts.filter((c, i) => c >= i + 1).length,
        documents: total
    };
}

async function main() {
    const metrics = JSON.parse(await readFile(METRICS_PATH, "utf8"));
    const before = JSON.stringify(metrics);

    try {
        Object.assign(metrics.scholar, await fetchScholarDirect());
        console.log("Scholar (doğrudan):", metrics.scholar);
    } catch (err) {
        console.warn("Scholar doğrudan erişim başarısız:", err.message);
        if (process.env.SERPAPI_KEY) {
            try {
                Object.assign(metrics.scholar, await fetchScholarSerpApi(process.env.SERPAPI_KEY));
                console.log("Scholar (SerpApi):", metrics.scholar);
            } catch (err2) {
                console.warn("Scholar SerpApi başarısız:", err2.message);
            }
        }
    }

    if (process.env.SCOPUS_API_KEY) {
        try {
            Object.assign(metrics.scopus, await fetchScopus(process.env.SCOPUS_API_KEY));
            console.log("Scopus:", metrics.scopus);
        } catch (err) {
            console.warn("Scopus başarısız:", err.message);
        }
    } else {
        console.warn("SCOPUS_API_KEY tanımlı değil, Scopus atlandı.");
    }

    // Sadece sayılar değiştiyse tarihi güncelle ve yaz (gereksiz commit/deploy olmasın)
    if (JSON.stringify(metrics) !== before) {
        metrics.updated = new Date().toISOString().slice(0, 10);
        await writeFile(METRICS_PATH, JSON.stringify(metrics, null, 2) + "\n");
        console.log("metrics.json güncellendi.");
    } else {
        console.log("Değişiklik yok.");
    }
}

main();
