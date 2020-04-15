const {name, version} = require('./package.json')

module.exports = {
    entry: 'src/index.js',
    output: {
        html: true,
        sourceMap: false,
        moduleName: 'VMoneySpinner',
        fileNames: {
            js: name + '.js'
        },
        format: 'umd',
    },
}
