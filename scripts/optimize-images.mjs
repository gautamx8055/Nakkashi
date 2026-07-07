import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const MAX_WIDTH = 1600;
const QUALITY = 82;

const SKIP = new Set(['favicon.ico', 'favicon.svg', 'robots.txt']);

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const imgs = files.filter(f => /\.(png|jpe?g)$/i.test(f) && !SKIP.has(path.basename(f)));

  let totalIn = 0;
  let totalOut = 0;
  let converted = 0;
  let skipped = 0;

  for (const src of imgs) {
    const rel = path.relative(PUBLIC_DIR, src);
    const outPath = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const inSize = (await stat(src)).size;
    totalIn += inSize;

    if (existsSync(outPath) && (await stat(outPath)).mtimeMs >= (await stat(src)).mtimeMs) {
      const outSize = (await stat(outPath)).size;
      totalOut += outSize;
      skipped++;
      console.log(`skip  ${rel}  (webp already up to date)`);
      continue;
    }

    try {
      const image = sharp(src, { failOn: 'none' });
      const meta = await image.metadata();
      const pipeline = image.rotate();
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath);
      const outSize = (await stat(outPath)).size;
      totalOut += outSize;
      converted++;
      const savePct = ((1 - outSize / inSize) * 100).toFixed(1);
      console.log(
        `ok    ${rel}  ${(inSize / 1024 / 1024).toFixed(2)}MB -> ${(outSize / 1024 / 1024).toFixed(2)}MB  (-${savePct}%)`
      );
    } catch (err) {
      console.error(`FAIL  ${rel}: ${err.message}`);
    }
  }

  console.log('');
  console.log(`Converted: ${converted}  Skipped: ${skipped}`);
  console.log(
    `Total: ${(totalIn / 1024 / 1024).toFixed(1)}MB -> ${(totalOut / 1024 / 1024).toFixed(1)}MB  ` +
      `(-${((1 - totalOut / totalIn) * 100).toFixed(1)}%)`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
