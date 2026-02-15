// Saves about 14% of file size
// Requires manual mapping of finish names and keys to shorter versions

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const outDir = path.join(__dirname, '..', 'dump');
const outFile = path.join(outDir, 'patterns.json');

// Mappings for key shortening
const finishMap = {
  fade: 'f',
  acid_fade: 'a_f',
  amber_fade: 'am_f',
  case_hardened: 'c_h',
  heat_treated: 'h_t',
  marble_fade: 'm_f'
};

const keyMap = {
  playside: 'ps',
  backside: 'bs',
  top: 't',
  magazine: 'm',
  percentage: 'p',
  blue: 'b',
  purple: 'u',
  gold: 'g',
  other: 'o',
  rank: 'r',
  fire_and_ice_tier: 'f_t',
  tier: 'i'
};

function shortenKeys(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(shortenKeys);

  const newObj = {};
  for (const k in obj) {
    const shortKey = keyMap[k] || k;
    newObj[shortKey] = shortenKeys(obj[k]);
  }
  return newObj;
}

const files = fs.readdirSync(dataDir)
  .filter(name => name.toLowerCase().endsWith('.json'))
  .sort((a, b) => a.localeCompare(b));

const combined = {};

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const parsed = JSON.parse(raw);

  const finishName = path.basename(file, path.extname(file));
  const shortFinish = finishMap[finishName] || finishName;

  combined[shortFinish] = shortenKeys(parsed);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(combined, null, 2) + '\n');

console.log(`Wrote ${outFile} with ${files.length} files and key shortening.`);