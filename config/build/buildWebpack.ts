import webpack from "webpack";
import path from "path";

import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

import { BuildOptions } from "./types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  return {
    mode: options.mode ?? "development",
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: "[main].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins({ options, isDev, isProd }),
    module: {
      rules: buildLoaders({ options, isDev }),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
