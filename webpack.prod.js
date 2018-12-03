const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const cssPlugin = new MiniCssExtractPlugin({
    filename: "src/[name].[hash].css",
    chunkFilename: "[id].css"
});

const CleanPlugin = new CleanWebpackPlugin('dist'); // CHOOSE FOLDER WHERE BUILD FILES SHOULD EXPORT

const CopyPlugin = new CopyWebpackPlugin([
    {
        from: 'src/images',
        to: 'src/images/[name].[ext]'
    },
    {
        from: 'src/data',
        to: 'src/data/[name].[ext]'
    }
]);

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const SVGPlugin = new HtmlWebpackInlineSVGPlugin({
    runPreEmit: true
});

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'), // CHOOSE FOLDER WHERE BUILD FILES SHOULD EXPORT
        filename: 'src/main.[hash].js'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devtool: 'source-map',
    performance: {
        hints: 'error'
    },
    plugins: [htmlPlugin, cssPlugin, SVGPlugin, CleanPlugin, CopyPlugin]
};
