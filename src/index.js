var loaderUtils = require('loader-utils');
function handlePath (path, url) {
  if (!path) return url;
  if (typeof path === 'function') return path(url);
  else if (path.endsWith('/')) return path + url;
  else return path + '/' + url;
}
var originOutputPath = undefined;
var originPublicPath = undefined;
var STYLE_REGX = /(?:\=|\.)(?:scss|sass|less|styl|stylus|css)(?:&scoped=true)?&?$/;
module.exports = function loader () {
  var options = loaderUtils.getOptions(this) || {};

  if (options.outputStylePath) {
    if (originOutputPath === undefined) originOutputPath = options.outputPath;
    var _query = this._compilation.name;
    options.outputPath = function (url) {
      if (_query && STYLE_REGX.test(_query)) return handlePath(options.outputStylePath, url);
      else return handlePath(originOutputPath, url);
    };
  }

  if (options.publicStylePath) {
    if (originPublicPath === undefined) originPublicPath = options.publicPath;
    var _query = this._compilation.name;
    options.publicPath = function (url) {
      if (_query && STYLE_REGX.test(_query)) return handlePath(options.publicStylePath, url);
      else return handlePath(originPublicPath, url);
    };
  }

  const fileLoader = require('file-loader');
  return fileLoader.apply(this, arguments);
};
exports.raw = true;
