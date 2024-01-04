import webpack from "webpack";
import "webpack-dev-server";
import { buildWebpack } from "./config/build/buildWebpack";
import path from "path";

import { BuildMode, BuildPaths } from "./config/build/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 4000,
    paths,
    analyzer: env.analyzer,
  });

  return config;
};
