import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('public');
const requiredMeta = [
  'description',
  'og:site_name',
  'og:title',
  'og:description',
  'og:type',
  'og:url',
  'og:image',
  'og:image:alt',
  'twitter:card',
  'twitter:site',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:image:alt',
];
const absoluteMeta = ['og:url', 'og:image', 'twitter:image'];
const representativePages = [
  'index.html',
  'schedule/index.html',
  'talks/beyond-cargo-build/index.html',
  'speakers/amos-wenger/index.html',
  'workshops/hands-on-embedded-rust/index.html',
  'travel/index.html',
];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : entryPath;
  });
}

function decodeHtml(value) {
  return value.replaceAll('&#x2F;', '/').replaceAll('&#x27;', "'").replaceAll('&amp;', '&').replaceAll('&quot;', '"');
}

function metaValues(html, key) {
  const tags = html.match(/<meta\s+[^>]*>/g) ?? [];
  return tags
    .filter((tag) => new RegExp(`(?:name|property)=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(tag))
    .map((tag) => decodeHtml(tag.match(/content=["']([^"']*)["']/)?.[1] ?? ''));
}

const htmlFiles = walk(publicDir).filter((file) => file.endsWith('.html'));
let jsonLdBlocks = 0;
let currentPages = 0;

for (const file of htmlFiles) {
  const relative = path.relative(publicDir, file);
  const html = fs.readFileSync(file, 'utf8');
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g)];

  for (const match of jsonLdMatches) {
    JSON.parse(match[1]);
    jsonLdBlocks += 1;
  }

  const canonicalTags = html.match(/<link\s+rel=["']canonical["'][^>]*>/g) ?? [];
  if (canonicalTags.length > 1) {
    throw new Error(`${relative}: duplicate canonical tags`);
  }

  for (const key of requiredMeta) {
    if (metaValues(html, key).length > 1) {
      throw new Error(`${relative}: duplicate ${key} tags`);
    }
  }

  if (relative === '404.html' || /^(?:20\d\d\/)/.test(relative)) {
    continue;
  }

  currentPages += 1;
  if ((html.match(/<title>[^<]+<\/title>/g) ?? []).length !== 1) {
    throw new Error(`${relative}: expected one non-empty title`);
  }
  if (canonicalTags.length !== 1) {
    throw new Error(`${relative}: expected one canonical tag`);
  }

  const canonical = decodeHtml(canonicalTags[0].match(/href=["']([^"']+)["']/)?.[1] ?? '');
  if (!canonical.startsWith('https://')) {
    throw new Error(`${relative}: canonical URL is not absolute`);
  }

  for (const key of requiredMeta) {
    const values = metaValues(html, key);
    if (values.length !== 1 || !values[0]) {
      throw new Error(`${relative}: expected one non-empty ${key} tag`);
    }
  }

  for (const key of absoluteMeta) {
    if (!metaValues(html, key)[0].startsWith('https://')) {
      throw new Error(`${relative}: ${key} is not absolute`);
    }
  }

  if (jsonLdMatches.length !== 1) {
    throw new Error(`${relative}: expected one JSON-LD block`);
  }
}

for (const relative of representativePages) {
  if (!fs.existsSync(path.join(publicDir, relative))) {
    throw new Error(`missing representative page: ${relative}`);
  }
}

const llmsPath = path.join(publicDir, 'llms.txt');
if (!fs.existsSync(llmsPath)) {
  throw new Error('missing public/llms.txt');
}

const llmsLines = fs.readFileSync(llmsPath, 'utf8').split('\n');
if (!/^# [^#]/.test(llmsLines[0]) || llmsLines.filter((line) => /^# /.test(line)).length !== 1) {
  throw new Error('llms.txt must start with exactly one H1 title');
}
if (!llmsLines[2]?.startsWith('> ')) {
  throw new Error('llms.txt must include a blockquote summary after its H1 title');
}

let insideFileList = false;
let fileListSections = 0;
for (const line of llmsLines) {
  if (line.startsWith('## ')) {
    insideFileList = true;
    fileListSections += 1;
    continue;
  }
  if (!insideFileList || line === '') {
    continue;
  }
  if (!/^- \[[^\]]+\]\((?:https?:\/\/|mailto:)[^)]+\): .+/.test(line)) {
    throw new Error(`invalid llms.txt file-list entry: ${line}`);
  }
}
if (fileListSections === 0) {
  throw new Error('llms.txt must include at least one H2 file-list section');
}

console.log(
  `Validated ${currentPages} current pages, ${jsonLdBlocks} JSON-LD blocks, and ${fileListSections} llms.txt sections.`
);
