const path = require("path");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: {
		"blog": "./src/blog.js",
		"static": "./src/static.js",
	},

	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		/* IMPORTANT!
		 * You must compile to UMD or CommonJS
		 * so it can be required in a Node context: */
		libraryTarget: "umd"
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["env", "react"]
				}
			}
		}, {
            test: /\.scss$/,
            exclude: /(node_modules)/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }]
	},

	plugins: [
		extractSass,
		new StaticSiteGeneratorPlugin({
			entry: "blog",
			paths: [
				"/",
				"/about"
			],
		})
	],

	devtool: "source-map"

};
