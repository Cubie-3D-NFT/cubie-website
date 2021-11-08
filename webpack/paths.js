const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  entryPath: path.resolve(__dirname, '../', 'src/index.jsx'),
  faviconPath: path.resolve(__dirname, '../', 'src/assets/images/favicon.png'),
  templatePath: path.resolve(__dirname, '../', 'src/template.html'),
  staticFolder: path.resolve(__dirname, '../', 'src/assets/static'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'styles',
  jsFolder: 'js',
};
