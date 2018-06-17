# vue-file-loader 

this is a file-loader wrapper for Vue and Webpack, solve the image relative path issues when HTML and CSS are not in the same directory.

if your output directory structure is like this:

```
index.html
images
  1.png
  2.png
styles
  1.css
  2.css
script
  1.js
  2.js
```
1.css load 1.png, the url in source code may be write like this `url(images/1.png)`, to support that, your webpack config maybe like this:
```
{ 
  test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/, 
  use: [{ loader: 'file-loader', options: { publicPath: '../', name: '/images/[name].[ext]?[hash]' }]
}
```
then webpack will translate `images/1.png` to `../images/1.png`, this does solve the issues, but wait, if your html has img tag that:
```
<img src="image/2.png">
```
webpack will translate `images/2.png` to `../images/2.png`, it leads html load `2.png` failure, so file-loader can't tell the picture from HTML or CSS.
vue-file-loader just solving this issues!
your webpack config can be like this:

```
{ 
  test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/, 
  use: [{ loader: 'vue-file-loader', options: { publicPath: '', publicStylePath: '../', name: '/images/[name].[ext]?[hash]' }]
}
```
or 
```
{ 
  test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/, 
  use: [{ 
    loader: 'url-loader', 
    options: { 
      limit: 2048, 
      publicPath: '', 
      publicStylePath: '../', 
      fallback: 'vue-file-loader',
      name: '/images/[name].[ext]?[hash]' 
    }
  ]
}
```
vue-file-loader will choose `publicPath` or `publicStylePath` based on the image from HTML or CSS.
