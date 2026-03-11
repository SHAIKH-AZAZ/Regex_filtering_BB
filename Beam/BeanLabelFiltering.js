// 05
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Allow __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Path to your JSON file
const inputPath = path.join(__dirname, "../cleaned_texts.json");
const outputPath = path.join(__dirname, "BeamLabels.json");

// changed better for better extractiion greedy version normalization
// label included  HB1 , RR1 , B1 , B1a , P1 , P1a  RB1  , PTBB1 , PB1 SB1 SBT1 MB1 AB1 BB1 FFB1 LB1 LBK1  DB1 TB1 bs1
const singleLabelRegex =
/(?<![A-Za-z0-9_-])(HB\d*[A-Za-z]?|RR\d*[A-Za-z]?|B\d+[A-Za-z]?|P\d+[A-Za-z]?|RB\d+[A-Za-z]?|PTBB\d+[A-Za-z]?|PB\d+[A-Za-z]?|SB\d+[A-Za-z]?|SBT\d+[A-Za-z]?|MB\d+[A-Za-z]?|AB\d+[A-Za-z]?|BB\d+[A-Za-z]?|CB\d+[A-Za-z]?|FFB\d+[A-Za-z]?|TFB\d+[A-Za-z]?|LB\d+[A-Za-z]?|LBK\d+[A-Za-z]?|DB\d+[A-Za-z]?|TB\d+[A-Za-z]?|bs\d+[A-Za-z]?|\d+F_B\d+[A-Za-z]?|MF_B\d+[A-Za-z]?|LGF_B\d+[A-Za-z]?|UGF_B\d+[A-Za-z]?|SGF_B\d+[A-Za-z]?|STB_B\d+[A-Za-z]?|LPTB-\d+[A-Za-z]?)(?![A-Za-z0-9_-])/gi;
/**
 * Extracts labels from an array of strings and flattens into single array
 * @param {string[]} arr - Array of input strings
 * @returns {string[]} all matches
 */
function extractLabelsFromArray(arr) {
  let allMatches = [];

  for (const str of arr) {
    const matches = [...str.matchAll(singleLabelRegex)];
    for (const m of matches) {
      console.log(m[0]);
      allMatches.push(m[0]);
    }
  }

  return allMatches;
}

// ✅ Load JSON
const raw = fs.readFileSync(inputPath, "utf-8");
const jsonArray = JSON.parse(raw);

// ✅ Extract all matches into one array
const result = extractLabelsFromArray(jsonArray);

// ✅ Save filtered result
fs.writeFileSync(outputPath, JSON.stringify(result.sort(), null, 2));

console.log(`✅ Done! Extracted labels saved to: ${outputPath}`);
