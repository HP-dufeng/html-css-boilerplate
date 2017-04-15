const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: '/' /** this is html src location */
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico',
            filename: './index.html'
        }),
        new ExtractTextPlugin('css/style.css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: require.resolve('bootstrap'),
                use: 'imports-loader?jQuery=jquery, Tether=tether'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 10, name: 'assets/[name]-[hash].[ext]' }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};

module.exports = config;
