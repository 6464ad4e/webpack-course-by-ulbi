import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

import { BuildOptions } from "./types";

export function buildPlugins(args: {
  options: BuildOptions;
  isDev: boolean;
  isProd: boolean;
}): Configuration["plugins"] {
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: args.options.paths.html,
      favicon: path.resolve(args.options.paths.public, "santa.ico"),
    }),
  ];

  if (args.isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (args.isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(args.options.paths.public, "locales"),
            to: path.resolve(args.options.paths.output, "locales"),
          },
        ],
      })
    );
  }

  if (args.options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
