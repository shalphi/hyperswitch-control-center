const path = require("path");
const webpack = require("webpack");
const { execSync } = require("child_process");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// var currentCommitHash = execSync("git rev-parse HEAD", {
//   encoding: "utf-8",
// }).trim();

let currentCommitHash = 'unknown';
try {
  currentCommitHash = execSync('git rev-parse HEAD').toString().trim();
} catch (e) {
  console.warn('Git not available, using "unknown" commit hash');
}

module.exports = {
  mode: "development",
  entry: {
    server: "./src/server/Server.res.js",
  },
  output: {
    filename: `server.js`,
    path: path.resolve(__dirname, "dist/server"),
    clean: true,
    publicPath: "/",
  },
  target: "node",
  plugins: [
    new webpack.DefinePlugin({
      GIT_COMMIT_HASH: JSON.stringify(currentCommitHash),
      IS_SCOPING_MODULE_ACTIVE: JSON.stringify(
        process.env.IS_SCOPING_MODULE_ACTIVE || "true",
      ),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "config", to: "config" }],
    }),
  ],
};
