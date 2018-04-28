// require modules
const fs = require('fs'),
      csv2geojson = require('csv2geojson'),
      chalk = require('chalk');

// create function convertCsv
function convertCsv() {
  
  // read file as csv or string
  fs.readFile(__dirname + '/../project-files/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {
    
    // stop script if error
    if (err) throw err;
    
    // output csv and and parsing csv
    console.log(chalk.green('austin-traffic-signals.csv loaded'))
    console.log(chalk.green('parsing csv ...'))

    // using csv2geojson to convert to GeoJSON
    csv2geojson.csv2geojson(csvString, {
      latfield: 'LATITUDE',
      lonfield: 'LONGITUDE',
      delimiter: ','
    }, (err, geojson) => {
      
      // stop the script if error
      if (err) throw err;

      // create outGeoJSON variable
      var outGeoJSON = filterFields(geojson);

      // write file 
      fs.writeFile(__dirname + '/../data/austin-traffic-signals.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {
        
        // stop the script if error
        if (err) throw err;

        // output json file written
        console.log(chalk.green('austin-traffic-signals.json written to file'));
      });
    })
  });
}

// create function filterFields
function filterFields(geojson) {

  // create new features
  var features = geojson.features,
    newFeatures = [];
  
  // loop through all features
  features.forEach((feature) => {
    
    // on each loop create an empty object
    var tempProps = {};

    // loop through each properties for that feature
    for (var prop in feature.properties) {
      // if it is a match
      if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
        // create the prop value
        tempProps[prop] = feature.properties[prop];
      }
    }

    // pushing a new feature to the newFeatures array 
    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });
  
  // return a GeoJSON object FeatureCollection
  // the new features are in the features value
  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

// exports the functions above
exports.convertCsv = convertCsv;
exports.filterFields = filterFields;