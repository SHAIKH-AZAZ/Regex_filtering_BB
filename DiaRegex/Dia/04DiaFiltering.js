import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "cleaned_texts.json");
const outputPath = path.join(__dirname, "filtered.json");

const singleLabelRegex = /^(?:(\d+)\s*)?([TØY]|TOR)\s*(\d+)\s*((?:@\d+(?:\+\d+)*\s*)+)(?:C\/C)?$/;


function extractLabelsFromArray(arr) {
  let allMatches = [];

  for (const str of arr) {
    const match = str.match(singleLabelRegex)
    if (match) {
      console.log(match);
      allMatches.push([...match]);
    }
  }

  return allMatches;
}

const raw = fs.readFileSync(inputPath, "utf-8");
const jsonArray = JSON.parse(raw);

const result = extractLabelsFromArray(jsonArray);

// ✅ Proper deduplication
const SeTresult = [
  ...new Set(result.map(r => JSON.stringify(r)))
].map(r => JSON.parse(r));

// ✅ Save
fs.writeFileSync(outputPath, JSON.stringify(SeTresult, null, 2));

console.log(`✅ Done! Extracted labels saved to: ${outputPath}`);


/**
 * [
  'T12@150C/C',
  undefined, for number  => 12T@150C/C , 12 number will be these
  'T', special chanracter 
  '12', bar dia 
  '@150', spacing 
  index: 0,
  input: 'T12@150C/C',
  groups: undefined
]
 */