const fs = require('fs');

const inputPath = 'test1.json';   // Your input JSON file with array of strings
const outputPath = 'test1output.json'; // Where to save the cleaned strings

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const arr = JSON.parse(data);

    if (!Array.isArray(arr)) {
      throw new Error('Input JSON is not an array');
    }

    // Extract text after last semicolon for each string
    const cleaned = arr.map(str => {
      if (typeof str === 'string') {
        return str.split(';').pop();
      }
      return str;  // just return original if not a string
    });

    fs.writeFile(outputPath, JSON.stringify(cleaned, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log(`Processed text saved to ${outputPath}`);
      }
    });

  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});
