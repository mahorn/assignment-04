// require our edit js modules
const bindData = require('./bindData.js'),
      colorScheme = require('./colorScheme.js'),
      csvConversion = require('./csv2geojson.js'),
      fs = require('fs');

// create a directory in data path 
fs.mkdir('data', function (err) {
  if (err) throw err
});

// constants bonded to newly created files 
bindData.processBindFiles();
colorScheme.extractColors();
csvConversion.convertCsv();