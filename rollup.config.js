import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import packagejson from "./package.json";
export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.cjs",
    format: "cjs",
  },
  external: [...Object.keys(packagejson.dependencies || {}), ...Object.keys(packagejson.devDependencies || {})],
  plugins: [
    typescript({
      //module: 'commonjs'
    }),
    nodeResolve(),
    commonjs({
      // extensions: ['.js', '.ts']
    }),
  ],
};
