# vueify-extract-css [![stability][0]][1]

Looks up `require('vueify-insert-css')` calls to extract CSS from a browserify bundle
to a file. 

## Command line
```sh
$ browserify -t vueify -p [ vueify-extract-css -o bundle.css ] index.js \
  -o bundle.js
```

## JS api
```js
const browserify = require('browserify')

browserify()
  .transform('vueify')
  .plugin('vueify-extract-css', { out: 'bundle.css' })
  .bundle()
```

```js
const browserify = require('browserify')

browserify()
  .transform('vueify')
  .plugin('vueify-extract-css', { out: createWriteStream })
  .bundle()

function createWriteStream () {
  return process.stdout
}
```

## Laravel Elixir
In your gulpfile, along with laravel-elixir-vueify:
```js
var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

elixir.config.js.browserify.plugins.push({
    name: 'vueify-extract-css',
    options: {
		out: 'path/to/extracted/css'
	}
});
```


## Options
- `-o` / `--out`: specify an outfile, defaults to `bundle.css`. Can also be a
  function that returns a writable stream from the JavaScript API.

## Installation
```sh
$ npm install vueify-extract-css
```

## See Also
- [vueify](https://github.com/vuejs/vueify)
- [insert-css](https://github.com/substack/insert-css)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index