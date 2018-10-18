const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssPlugin = new MiniCssExtractPlugin({
	filename: "[name].css",
	chunkFilename: "[id].css"
});

const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				//fallback: "style-loader",
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				type: 'javascript/auto',
				test: /\.json$/,
				exclude: /(node_modules|bower_components)/,
				use: [
                    {
    					loader: 'file-loader',
    					options: {
    						name: '[name].[ext]'
    					},
    				}
                ],
			}
		]
	},
	devtool: 'source-map',
	performance: {
		hints: 'error'
	},
	plugins: [cssPlugin]
};
