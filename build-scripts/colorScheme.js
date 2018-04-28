
// require modules
const fs = require('fs'),
      chalk = require('chalk');

// create function extractColors 
function extractColors() {

  // request file
  fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

    // stop the script if error
    if (err) throw err;

    // data loaded 
    console.log(chalk.blue("cartocolors.json data loaded!"));

    // create constant data to parse the above file to JSON
    const data = JSON.parse(response);

    // data parsed
    console.log(chalk.blue("cartocolors.json data parsed to JSON"));

    // create a constant output Data to extract Vivid scheme color data
    const outputData = {
      'Vivid': data['Vivid']
    };

    // vivid scheme extracted from parsed data
    console.log(chalk.blue("vivid scheme extracted from parsed data"));

    // write the output file, stringifying the JS object 
    fs.writeFile(__dirname + '/../data/vividcolors.json', JSON.stringify(outputData), 'utf-8', function (err) {

      // stop the script if error
      if (err) throw err;

      // create a json file with wanted data 
      console.log(chalk.blue('vividcolors.json written to data/ dir'));
    });
  });
}

// export the above function
exports.extractColors = extractColors