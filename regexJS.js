const fs = require('fs');

// Path to your JSON file
const filePath = 'sample.json';

// Read and parse the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Convert JSON to string if needed
  let jsonString;
  try {
    const jsonData = JSON.parse(data);
    jsonString = JSON.stringify(jsonData);
  } catch (parseError) {
    console.log("File is not valid JSON, treating as raw text.");
    jsonString = data;
  }

  // Regular expression for matching "{\\fCalibri|b0|i0|c0;"
  const regex = /{\\fCalibri\|b0\|i0\|c0;/g;

  const matches = jsonString.match(regex);

  if (matches && matches.length > 0) {
    console.log(`Found ${matches.length} occurrence(s):`);
    matches.forEach((match, index) => {
      console.log(`${index + 1}: ${match}`);
    });
  } else {
    console.log("No matches found.");
  }
});
