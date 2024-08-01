const fs = require("fs/promises");
async function ProcessFile(inputFile, outputFile) {
  try {
    //read an array
    const data = await fs.readFile(inputFile, "utf8");
    jsonData = JSON.parse(data);

    //Multiplying the numbers in the array by 2
    const doubledNumbers = jsonData.numbers.map((number) => number * 2);
    const outputData = { doubledNumbers }; //make it the same format as input file

    // write the doubled numbers to the output file
    await fs.writeFile(outputFile, JSON.stringify(outputData));

    console.log("File processed successfully");
  } catch (error) {
    console.log("An error occurred", error.message);
  }
}

const inputFile = "./sample_input_numbers.json";
const outputFile = "./sample_output_numbers.json";
ProcessFile(inputFile, outputFile);
