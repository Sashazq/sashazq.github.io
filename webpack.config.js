const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = {
    entry: './main.js',

    output: {
        path:'./',
        filename: 'bundle.js',
    },

    resolve: {
        modulesDirectories: ['node_modules']
    },

    devServer: {
        inline: true,
        port: 8080
    },

    devtool: "#source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
            }
        ],
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.DedupePlugin(), //dedupe similar code
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
        new ExtractTextPlugin('bundle.css')
    ]
};

module.exports = config;