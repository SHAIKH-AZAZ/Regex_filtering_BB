import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Allow __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Path to your JSON file
const inputPath = path.join(__dirname, "cleaned_texts.json");
const outputPath = path.join(__dirname, "filtered.json");

// ✅ Regex for labels (word boundary + global search)
const singleLabelRegex =
  /\b(\d+)\s*[-±,]?\s*([YTØ#]|TOR)\s*(\d+)\b/g;
/**
 * Extracts labels from an array of strings and flattens into single array
 * @param {string[]} arr - Array of input strings
 * @returns {string[]} all matches
 */
function extractLabelsFromArray(arr) {
  let allMatches = [];

  for (const str of arr) {
    let match;
    
    match = singleLabelRegex.exec(str)
    if (!(match == null)) {
      console.log(match);
      allMatches.push([...match]);

    }
    
    singleLabelRegex.lastIndex = 0; // reset regex
  }

  return allMatches;
}

// ✅ Load JSON
const raw = fs.readFileSync(inputPath, "utf-8");
const jsonArray = JSON.parse(raw);

// ✅ Extract all matches into one array
const result = extractLabelsFromArray(jsonArray);
const  SeTresult = [...new Set(result)]

// ✅ Save filtered result
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log(`✅ Done! Extracted labels saved to: ${outputPath}`);

/**
 * [
  '8Y20', original string
  '8', repition number
  'Y', spacial character
  '20', bar diameter
  index: 0,
  input: '8Y20(BOTTOM)MAIN',
  groups: undefined
]
 */