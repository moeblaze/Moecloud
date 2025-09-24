#!/usr/bin/env node
/**
 * Combines page sitemap (sitemap.xml) and image sitemap (image-sitemap.xml) into sitemap_index.xml
 * Ensures robots.txt references sitemap_index.xml
 */
import { readFileSync, writeFileSync, existsSync } from "fs";

const BASE_URL = process.env.SITE_BASE_URL || "https://www.moecommunitycloud.com";
const TODAY = new Date().toISOString().slice(0,10);

const hasPage = existsSync("sitemap.xml");
const hasImage = existsSync("image-sitemap.xml");

let entries = [];
if (hasPage) entries.push(`${BASE_URL}/sitemap.xml`);
if (hasImage) entries.push(`${BASE_URL}/image-sitemap.xml`);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(u => `  <sitemap>
    <loc>${u}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>
`;
writeFileSync("sitemap_index.xml", xml, "utf8");

// Update robots.txt to point to the index
let robots = existsSync("robots.txt") ? readFileSync("robots.txt","utf8") : "User-agent: *\nAllow: /\n\n";
robots = robots.replace(/Sitemap:\s*.*\n?/gi, ""); // remove old lines
robots += `Sitemap: ${BASE_URL}/sitemap_index.xml\n`;
writeFileSync("robots.txt", robots, "utf8");

console.log("Generated sitemap_index.xml and updated robots.txt");
