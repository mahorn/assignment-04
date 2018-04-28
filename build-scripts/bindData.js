// require modules
const fs = require('fs'),
      csvParse = require('csv-parse'),
      chalk = require('chalk'),
      mapshaper = require('mapshaper');

function processBindFiles() {
  
// read file council districts json
  fs.readFile(__dirname + "/../project-files/austin-council-districts.json", 'utf8', (err, geojson) => {

    // stop the script if error
    if (err) throw err;

    // create nested constant commands to filter fields and coordinate precision
    const commands = '-filter-fields council_di -simplify dp 15% -o precision=.0001 format=geojson';

    // use mapshaper to remove unnecessary vertices
    mapshaper.applyCommands(commands, geojson, (err, data) => {

      // stop the script if error
      if (err) throw err;
      
      // create constant geojson to parse data
      const geojson = JSON.parse(data);

      // parse the CSV file from text to array of objects
      fs.readFile(__dirname + "/../project-files/austin-traffic-signals.csv", "utf8", (err, csvString) => {

        // stop the script if error
        if (err) throw err;

        csvParse(csvString, {
          columns: true
        }, (err, csv) => {

          // create constant outGeoJSON that contains bindData
          const outGeoJSON = bindData(geojson, csv);

          // write the output file, stringifying the JS object
          fs.writeFile(__dirname + '/../data/districts-counts.json', JSON.stringify(outGeoJSON), 'utf8', function (err) {

            // stop the script if error
            if (err) throw err;

            console.log(chalk.green('districts-counts.json written'));
          })
        });
      });
    });
  });
}

// create a function bindData accessing to geojson and csv files
function bindData(geojson, csv) {

  // loop through the features
  geojson.features.forEach(function (feature) {

    // set variable to 0
    let count = 0;

    // loop through the array of scv data of objects
    csv.forEach((row) => {

      // if IDs match
      if (feature.properties.council_di === row.COUNCIL_DISTRICT) {
        count++ // increment the count for that feature
      }
    });

    // when done looping, add the count as a feature property
    feature.properties.count = count;

  });

  // returns a newly geojson file
  return geojson;

}

// exports the functions above 
exports.processBindFiles = processBindFiles;
exports.bindData = bindData;