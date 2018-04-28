const bindData = require('./bindData.js'),
      colorScheme = require('./colorScheme.js'),
      csvConversion = require('./csv2geojson.js'),
      fs = require('fs');

fs.mkdir('data', function (err) {
  if (err) throw err
});

bindData.processBindFiles();
colorScheme.extractColors();
csvConversion.convertCsv();