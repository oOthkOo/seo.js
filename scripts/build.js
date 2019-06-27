const npm_package = require('../package')
const fs = require('fs')
const UglifyJS = require('uglify-js')

const version = npm_package.version
const source = './seo.js'
const dest = `./dist/seo-${version}.min.js`

const code = fs.readFileSync(source, 'utf8').toString()

const preamble = `/* Seo.js v${version} by Tierry Danquin
https://github.com/oOthkOo/seo.js */`

const options = {
    compress: {
        global_defs: {
            "@console.log": "alert"
        },
        passes: 2
    },
    output: {
        beautify: false,
        preamble: preamble
    }
}
const result = UglifyJS.minify(code, options)
fs.writeFileSync(dest, result.code)
