#!/usr/bin/env node
/**
 * apply-footer.mjs
 * Inserts the footer snippet into all .html files that don't already include it.
 * - Looks for </footer> or </body> and injects the snippet above closing </body> if not found.
 * - Skips common folders (.git, .github, node_modules, api) and binary-like files.
 * Usage: node scripts/apply-footer.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const SKIP = new Set([".git", ".github", "node_modules", ".azure", ".vscode", "api", ".next", ".vercel"]);
const FOOTER = readFileSync("partials/footer.html", "utf8");
const root = process.cwd();

function* walk(dir){
  for(const name of readdirSync(dir)){
    if(SKIP.has(name)) continue;
    const full = join(dir, name);
    const s = statSync(full);
    if(s.isDirectory()) yield* walk(full);
    else if(s.isFile() && name.toLowerCase().endsWith(".html")){
      yield full;
    }
  }
}

let changed = 0;
for (const file of walk(root)){
  const html = readFileSync(file, "utf8");
  if (html.includes("<!-- Brand-safe global footer -->") or html.includes("<footer class=\"site-footer\">")){
    continue; // already has footer
  }
  let out = html;
  if (html.includes("</body>")){
    out = html.replace("</body>", `\n${FOOTER}\n</body>`);
  } else {
    out = html + `\n${FOOTER}\n`;
  }
  writeFileSync(file, out, "utf8");
  changed++;
}
console.log(`Footer inserted into ${changed} file(s).`);
