import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const buildRoot = path.join(projectRoot, "dist", "public");
const version = (process.argv.slice(2).filter((arg) => arg !== "--")[0] || "local").replace(/[^a-zA-Z0-9._-]/g, "");

const htmlFiles = ["index.html", "404.html"];
const localFavicon = "./gh-pages-assets/keluargaharmonis-favicon.png";

async function prepareHtml(fileName) {
  const buildFile = path.join(buildRoot, "index.html");
  let html = await readFile(buildFile, "utf8");

  html = html.replaceAll(
    /((?:src|href)=\"\.\/assets\/[^\"]+\.(?:js|css))(\")/g,
    `$1?v=${version}$2`,
  );
  html = html.replaceAll(
    /\/manus-storage\/keluargaharmonis-favicon_[^\"']+\.png/g,
    localFavicon,
  );
  html = html.replace(
    "</head>",
    `<meta name=\"build-version\" content=\"${version}\" /></head>`,
  );

  await writeFile(path.join(projectRoot, fileName), html);
}

await mkdir(path.join(projectRoot, "assets"), { recursive: true });
await mkdir(path.join(projectRoot, "gh-pages-assets"), { recursive: true });
await rm(path.join(projectRoot, "assets"), { recursive: true, force: true });
await mkdir(path.join(projectRoot, "assets"), { recursive: true });
await cp(path.join(buildRoot, "assets"), path.join(projectRoot, "assets"), {
  recursive: true,
});
await cp(
  path.join(buildRoot, "gh-pages-assets"),
  path.join(projectRoot, "gh-pages-assets"),
  { recursive: true, force: true },
);

// The custom logo and favicon are intentionally preserved in the repository root.
for (const brandingFile of [
  "keluargaharmonis-logo.webp",
  "keluargaharmonis-favicon.png",
]) {
  const existing = path.join(projectRoot, "gh-pages-assets", brandingFile);
  try {
    await readFile(existing);
  } catch {
    console.warn(`Branding asset missing: ${brandingFile}`);
  }
}

for (const fileName of htmlFiles) {
  await prepareHtml(fileName);
}

await writeFile(
  path.join(projectRoot, "gh-pages-assets", "build-version.txt"),
  `${version}\n`,
);
console.log(`Prepared GitHub Pages artifact version ${version}`);
