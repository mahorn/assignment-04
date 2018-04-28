const fs = require('fs'),
      csv2geojson = require('csv2geojson'),
      chalk = require('chalk');

function convertCsv() {
  
  fs.readFile(__dirname + '/../project-files/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {

    if (err) throw err;

    console.log(chalk.green('austin-traffic-signals.csv loaded'))
    console.log(chalk.green('parsing csv ...'))

    csv2geojson.csv2geojson(csvString, {
      latfield: 'LATITUDE',
      lonfield: 'LONGITUDE',
      delimiter: ','
    }, (err, geojson) => {

      if (err) throw err;

      var outGeoJSON = filterFields(geojson);


      fs.writeFile(__dirname + '/../data/austin-traffic-signals.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {

        if (err) throw err;

        console.log(chalk.green('austin-traffic-signals.json written to file'));
      });
    })
  });
}

function filterFields(geojson) {

  var features = geojson.features,
    newFeatures = [];

  features.forEach((feature) => {

    var tempProps = {};

    for (var prop in feature.properties) {
      if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
        tempProps[prop] = feature.properties[prop];
      }
    }

    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });

  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

exports.convertCsv = convertCsv;
exports.filterFields = filterFields;