const fs = require('fs'),
      chalk = require('chalk');


function extractColors() {

  fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

    if (err) throw err;

    console.log(chalk.blue("cartocolors.json data loaded!"));

    const data = JSON.parse(response);

    console.log(chalk.blue("cartocolors.json data parsed to JSON"));

    const outputData = {
      'Vivid': data['Vivid']
    };

    console.log(chalk.blue("vivid scheme extracted from parsed data"));

    fs.writeFile(__dirname + '/../data/vividcolors.json', JSON.stringify(outputData), 'utf-8', function (err) {

      if (err) throw err;

      console.log(chalk.blue('vividcolors.json written to data/ dir'));
    });
  });
}

exports.extractColors = extractColors