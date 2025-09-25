const fs = require('fs');

const filePath = 'sample.json'; // your file
const outputPath = 'output.json'; 

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const objects = jsonData.OBJECTS || [];




      // Extract only 'text' values from 'MTEXT' entities
        const extractedTexts = objects
      .filter(obj => obj.entity === 'MTEXT' || obj.entity ==='text' && obj.text)
      .map(obj => obj.text);

    // Write extracted text values to output file
    fs.writeFile(outputPath, JSON.stringify(extractedTexts, null, 2), (err) => {
      if (err) {
        console.error("Error writing output file:", err);
      } else {
        console.log(`Successfully saved ${extractedTexts.length} text values to '${outputPath}'`);
      }
    });

   

  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});
