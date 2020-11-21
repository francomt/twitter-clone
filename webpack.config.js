module.exports = {
  mode: "development",
  entry: ["./client/index.js", "./public/sass/main.scss"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css?$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "./public", name: "style.css" },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
