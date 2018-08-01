var webpack = require("webpack");

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: "eval-source-map",
  // entry:  __dirname + "/app/ShoppingListMiniApp/AnimatedShoppingList.js",
  // entry:  __dirname + "/app/ShoppingListMiniApp/DnDMain.js",
   entry: __dirname + "/app/App.js",
  // entry:  __dirname + "/app/RoutingMiniApp/RoutingApp.js",
  // entry:  __dirname + "/app/BankFluxMiniApp/FluxApp.js",
  // entry:  __dirname + "/app/AirCheapApp/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  }
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === "production") {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    })
  ];
}

module.exports = config;
