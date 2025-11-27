import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";

const jsConfig = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    json(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: false,
      declarationMap: false,
    }),
    postcss({
      extract: false, // Don't extract to single file - keep modular
      modules: false,
      minimize: false,
      use: ['sass'],
      sourceMap: true,
    }),
    copy({
      targets: [
        {
          src: "src/**/*.scss",
          dest: "dist",
          rename: (name, extension, fullPath) => {
            return fullPath.replace('src/', '');
          }
        },
        {
          src: "src/shared/assets/svg-icons/*",
          dest: "dist/shared/assets/svg-icons"
        }
      ],
      hook: 'writeBundle'
    })
  ],
  external: [
    "react",
    "react-dom",
    "@ionic/react",
    "@ionic/react-router",
    "react-toastify",
    "formik",
    "yup",
    "i18next",
    "react-i18next"
  ],
};

const dtsConfig = {
  input: "src/index.ts",
  output: {
    file: "dist/index.d.ts",
    format: "esm",
  },
  plugins: [
    dts({
      compilerOptions: {
        skipLibCheck: true,
      }
    })
  ],
  external: [/\.(css|scss|sass)$/],
};

export default [jsConfig, dtsConfig];
