import { RebarLabelExtractor } from './Dia/01DiaFiltering.js';

const extractor = new RebarLabelExtractor();
const testData = ["3-T12", "T8@200c/c", "4-T20+10-T16"];
const results = extractor.processBatch(testData);

console.log("Extracted labels:", results.uniqueLabels);
