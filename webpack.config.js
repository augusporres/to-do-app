const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.join(__dirname + '/src/public'),
        filename: 'bundle.js'
    },

    // Setup loaders
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },

};