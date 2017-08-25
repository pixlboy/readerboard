const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require("webpack-dev-server");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(params){
    let webpackConfig = {
        context: path.resolve( __dirname, './src'),     // __dirname refers to the directory where this webpack.config.js lives
        entry: './app.js',      //This can take multiple inputs in form of an array
        output: {
            path: path.resolve(__dirname, './dist'),    // __dirname refers to the directory where this webpack.config.js lives
            filename: 'readerboard.js',
            library : "Readerboard",    // it will attach your bundle to a window.<libraryname>, can be used to call available methods
            publicPath: '/',
        },
        watch: true,
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    loader: 'react-hot-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    loader: 'react-hot-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: [
                          'transform-class-properties',
                          'transform-decorators-legacy'
                        ]
                    }
                },
                {
                    test: /\.scss?$/,
                    exclude: /(node_modules)/,
                    use: ExtractTextPlugin.extract({
                        use: [ 'css-loader', 'sass-loader' ],
                        fallback: 'style-loader',
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
              filename: 'readerboard.css',
              allChunks: true,
            }),
        ],
        resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],
            extensions: [ '.js', '.jsx','.scss' ]
        },
        devServer : {
            contentBase: path.resolve(__dirname, './'),     //specify the path from which dev server should serve the contents
            inline :  true,      //to run out of IFRAME, default it runs in iframe
            stats : "errors-only",    //to output only the errors, default it outputs everything and makes log huge
            port : 8888
        }
    };
    return webpackConfig;
}
