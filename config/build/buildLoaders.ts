import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { BuildOptions } from "./types";

export function buildLoaders(args: {
  options: BuildOptions;
  isDev: boolean;
}): ModuleOptions["rules"] {
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: args.isDev
          ? "[path][name]__[local]"
          : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      args.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: args.isDev,
        getCustomTransformers: () => ({
          before: [args.isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
      },
    },
    exclude: /node_modules/,
  };

  // const babelLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: "babel-loader",
  //     options: {
  //       presets: [
  //         "@babel/preset-env",
  //         "@babel/preset-typescript",
  //         [
  //           "@babel/preset-react",
  //           { runtime: args.isDev ? "automatic" : "classic" },
  //         ],
  //       ],
  //     },
  //   },
  // };

  const assetsLoader = {
    test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
    // More information here https://webpack.js.org/guides/asset-modules/
    type: "asset",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [assetsLoader, scssLoader, tsLoader, svgrLoader];
}
