var loaderUtils = require('loader-utils');
function handlePath (path, url) {
  if (!path) return url;
  if (typeof path === 'function') return path(url);
  else if (path.endsWith('/')) return path + url;
  else return path + '/' + url;
}
let originPublicPath = undefined;
module.exports = function loader (content) {
  let options = loaderUtils.getOptions(this) || {};
  if (options.publicStylePath) {
    if (originPublicPath === undefined) originPublicPath = options.publicPath;
    let _query = this._compilation.name;
    options.publicPath = function (url) {
      if (_query && /(?:\=|\.)(?:scss|css)$/.test(_query)) return handlePath(options.publicStylePath, url);
      else return handlePath(originPublicPath, url);
    };
  }

  const fileLoader = require('file-loader');
  return fileLoader.call(this, content);
};
