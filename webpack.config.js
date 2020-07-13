var path = require('path');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	context: __dirname,
  	entry: './src/js/index.js',
  	output: {
    	path: path.resolve( __dirname, 'dist' ),
      publicPath: '/',
    	filename: 'index.js',
   	},
   	plugins: [
      new CleanWebpackPlugin(),
    	new HtmlWebPackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets/imgs/textures/pano1/*', to: 'assets/imgs/textures/pano1/[name].[ext]' },
          { from: 'src/assets/imgs/textures/pano2/*', to: 'assets/imgs/textures/pano2/[name].[ext]' },
          { from: 'src/assets/imgs/*', to: 'assets/imgs/[name].[ext]' },
          { from: 'src/js/*', to: 'js/[name].[ext]' }
        ],
      }),
   	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
    hot: true
	}
};