const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const outDir = path.join(__dirname, '..', 'dump');
const outFile = path.join(outDir, 'patterns.json');

const files = fs.readdirSync(dataDir)
  .filter((name) => name.toLowerCase().endsWith('.json'))
  .sort((a, b) => a.localeCompare(b));

const combined = {};

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const parsed = JSON.parse(raw);
  const key = path.basename(file, path.extname(file));
  combined[key] = parsed;
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(combined, null, 2) + '\n');

console.log(`Wrote ${outFile} with ${files.length} files.`);
