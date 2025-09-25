import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Allow __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON file
const inputPath = path.join(__dirname, "cleaned_texts.json");
const outputPath = path.join(__dirname, "filtered.json");

// ✅ Regex for labels (handles S1, S2, SQ, S1M, STB1, ST, etc.)
// const singleLabelRegex = /\bS[0-9A-Z]*\b/g;
// const singleLabelRegex = /\bS(?:\d+[A-Z0-9]*|[A-Z]+(?:\d+)?)\b/g;
const singleLabelRegex = /\bS(?:(\d{1,3})([A-Z]{1,5})?|([A-Z]{1,5})(\d{1,3})?)\b/g;



// Optional: If you also want "Section" based matches (e.g., "Section S1")
// const sectionRegex = /\bSection\s+S[0-9A-Z]*\b/g;

/**
 * Extracts labels from an array of strings using a more modern approach.
 * @param {string[]} arr - Array of input strings
 * @returns {string[]} all matches
 */
function extractLabelsFromArray(arr) {
  return arr.flatMap(str => {
    const matches = [
      ...Array.from(str.matchAll(singleLabelRegex), match => match[0])
    ];
    return matches;
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
