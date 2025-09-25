import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Allow __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file
const inputPath = path.join(__dirname, "cleaned_texts.json");
const outputPath = path.join(__dirname, "filtered.json");

// Regex for labels (no changes here)
const singleLabelRegex =
  /\b(?:[A-Z]{1,3}-)?(?:BSW|SW|LW|AC|GC|BC|CP|NC|SC|PC|RW|P|C|R)\d+[A-Z]*\b/gi;

/**
 * Extracts labels from an array of strings using a more modern approach.
 * @param {string[]} arr - Array of input strings
 * @returns {string[]} all matches
 */
function extractLabelsFromArray(arr) {
  // Use flatMap to iterate through the array and flatten the results in one go.
  return arr.flatMap(str => {
    // str.matchAll(regex) returns an iterator of all matches.
    // We convert the iterator to an array with Array.from().
    // The second argument to Array.from() maps over each match to extract the full matched string (match[0]).
    return Array.from(str.matchAll(singleLabelRegex), match => match[0]);
  });
}

// --- The rest of the script is the same ---

// Load JSON
const raw = fs.readFileSync(inputPath, "utf-8");
const jsonArray = JSON.parse(raw);

// Extract all matches into one array
const result = extractLabelsFromArray(jsonArray);

// Save filtered result
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log(`✅ Done! Extracted labels saved to: ${outputPath}`);

