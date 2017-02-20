const webpack = require('webpack')

module.exports = {
    entry:'./src/app.js',
    output: {
        path: 'src',
        filename: 'bundle.js'
    },
       module:{
         loaders:[{
             loader:'babel-loader',
             test: /\.(jsx|js)?/,
             exclude: /(node_modules|bower_components)/
          }
         ]
      },
       resolve: {
                extensions: ['.js', '.jsx']
        },
       target : "electron"
      
}
