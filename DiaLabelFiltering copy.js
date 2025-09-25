// DiaLabelFiltering copy.js (ESM)
import fs from "node:fs";
import path from "node:path";
import * as url from "node:url";

// ESM path helpers
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths from your message
const inputPath = path.join("C:/Users/Dell/Desktop/Codes/TextAutoCad/trogon", "cleaned_texts.json");
const outputPath = path.join(__dirname, "filtered_tokens.json");

// Provided regex (3 capture groups): count, optional diameter, symbol
const re = /^\s*(\d+)\s*(?:-\s*(\d+))?\s*(Y|T|Ø|#|TOR)\b/i;

function extractLabels(lines) {
  const labels = [];
  for (const line of lines) {
    if (typeof line !== "string") continue;
    const m = line.match(re);                 // returns [full, g1, g2?, g3] or null [1]
    if (!m) continue;                         // guard when no match [1]
    const count = m[13];
    const dia = m[14] || "";                   // optional group may be undefined [4]
    const sym = (m[11] || "").toUpperCase();   // guard before toUpperCase [7]
    labels.push(`${count}-${dia}${sym}`);
  }
  return Array.from(new Set(labels)).sort();  // unique + sorted
}

// Load input, extract, write output
const raw = fs.readFileSync(inputPath, "utf-8");      // sync read for simplicity [16]
const lines = JSON.parse(raw);                         // must be a JSON array of strings [15]
const labels = extractLabels(lines);
fs.writeFileSync(outputPath, JSON.stringify(labels, null, 2), "utf-8"); // write JSON [16]

console.log(`Wrote ${labels.length} labels to ${outputPath}`);
