#!/usr/bin/env node
/**
 * Scans the repo for images and generates image-sitemap.xml.
 * Supports: jpg, jpeg, png, webp, gif. Skips .github, node_modules, .git, etc.
 * Usage: node scripts/generate-image-sitemap.mjs --base-url https://www.example.com
 */
import { readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = (process.argv.find(a=>a.startsWith("--base-url"))?.split("=")[1]) || process.env.SITE_BASE_URL || "https://www.moecommunitycloud.com";
const TODAY = new Date().toISOString().slice(0,10);
const SKIP = new Set([".git",".github","node_modules",".azure",".vscode",".next",".vercel"]);
const EXTS = new Set([".jpg",".jpeg",".png",".webp",".gif"]);

function* walk(dir){
  for(const name of readdirSync(dir)){
    if(SKIP.has(name)) continue;
    const full = join(dir,name);
    const s = statSync(full);
    if(s.isDirectory()) yield* walk(full);
    else if(s.isFile()){
      const lower = name.toLowerCase();
      const ext = lower.slice(lower.lastIndexOf("."));
      if(EXTS.has(ext)){
        yield full;
      }
    }
  }
}

const root = process.cwd();
const images = [];
for (const f of walk(root)){
  let rel = f.replace(root,"").replace(/\\/g,"/");
  if(rel.startsWith("/")) rel = rel.slice(1);
  // Construct URL (just serve directly)
  const loc = `${BASE_URL}/${rel}`.replace(/\/{2,}/g,"/").replace(":/","://");
  images.push({loc});
}

const items = images.map(img => `  <url>
    <loc>${img.loc}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
    </image:image>
    <lastmod>${TODAY}</lastmod>
  </url>`).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${items}
</urlset>
`;

writeFileSync("image-sitemap.xml", xml, "utf8");
console.log(`Generated image-sitemap.xml with ${images.length} images.`);
