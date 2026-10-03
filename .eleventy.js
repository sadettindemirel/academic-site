const markdownIt = require("markdown-it");
const Prism = require("prismjs");
require("prismjs/components/")(["r", "python", "sql", "bash", "json"]);

// Syntax highlighting for fenced code blocks at build time (no client-side JS needed)
function highlight(code, lang) {
    const grammar = Prism.languages[lang];
    const body = grammar ? Prism.highlight(code, grammar, lang) : markdownIt().utils.escapeHtml(code);
    return `<pre class="code-block" data-lang="${lang || ""}"><code class="language-${lang || "text"}">${body}</code></pre>`;
}

module.exports = function (eleventyConfig) {
    // Enable HTML inside Markdown (for embeds, iframes, scripts)
    const md = markdownIt({ html: true, breaks: true, linkify: true, highlight });
    eleventyConfig.setLibrary("md", md);

    // Copy static assets to output
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/profile.jpeg");
    eleventyConfig.addPassthroughCopy("src/favicon.svg");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.{jpg,jpeg,png,gif,webp}");

    // Canonical site address (used for Open Graph, canonical links and sitemap)
    eleventyConfig.addGlobalData("siteUrl", "https://sadettindemirel.com");

    // Blog collection - sorted by date descending
    eleventyConfig.addCollection("blog", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => {
            return new Date(b.data.date) - new Date(a.data.date);
        });
    });

    // Date formatting filter (Turkish)
    eleventyConfig.addFilter("trDate", function (dateStr) {
        const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
        const d = new Date(dateStr);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    });

    // Date formatting filter (English)
    eleventyConfig.addFilter("enDate", function (dateStr) {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const d = new Date(dateStr);
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    });

    // Publications marked "featured" in the CMS, across all categories
    eleventyConfig.addFilter("featuredPubs", function (categories) {
        return categories.flatMap(c => c.items.filter(p => p.featured));
    });

    // Rounded axis maximum and ticks for the citation chart (steps of 1/2/5 × 10^n, at most 4 intervals)
    eleventyConfig.addFilter("chartTicks", function (rows, key) {
        const max = Math.max(1, ...rows.map(r => r[key]));
        const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
        const step = [0.1, 0.2, 0.5, 1, 2, 5, 10].map(m => m * magnitude)
            .find(s => s >= 1 && Math.ceil(max / s) <= 4);
        const ticks = [];
        for (let i = 0; i <= Math.ceil(max / step); i++) ticks.push(Math.round(i * step));
        return ticks;
    });

    // ISO date for structured data / article meta
    eleventyConfig.addFilter("dateIso", function (dateStr) {
        return new Date(dateStr).toISOString().slice(0, 10);
    });

    // schema.org Person for the home page (helps search engines link the academic profiles)
    eleventyConfig.addFilter("personJsonLd", function (site, siteUrl) {
        return JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            honorificPrefix: "Dr.",
            jobTitle: site.title_en,
            affiliation: { "@type": "CollegeOrUniversity", name: "Üsküdar University" },
            description: site.bio_summary_en,
            url: siteUrl,
            image: `${siteUrl}/profile.jpeg`,
            email: site.email,
            sameAs: site.social_links.filter(l => l.platform !== "email").map(l => l.url)
        });
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "html", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
