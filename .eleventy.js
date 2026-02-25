const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    // Enable HTML inside Markdown (for embeds, iframes, scripts)
    const md = markdownIt({ html: true, breaks: true, linkify: true });
    eleventyConfig.setLibrary("md", md);

    // Copy static assets to output
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/profile.jpeg");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/blog/**/*.{jpg,jpeg,png,gif,webp}");

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
