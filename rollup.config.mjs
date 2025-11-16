import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json"; // ← Добавьте эту строку

// Основная сборка JavaScript
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
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    postcss({
      extract: true, // Извлекаем CSS в отдельный файл
      minimize: false,
      use: ['sass'],
      sourceMap: true,
    }),
    copy({
      targets: [
        { 
          src: "src/shared/assets/icons/*.svg", 
          dest: "dist/shared/assets/icons" 
        }
      ],
      hook: 'writeBundle' // Копируем после создания bundle
    })
  ],
  external: ["react", "react-dom", "react-toastify"], // Добавляем внешние зависимости
};

// Сборка типов
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
  external: [/\.(css|scss|sass)$/, "react", "react-dom", "react-toastify"], // Игнорируем CSS/SCSS
};

export default [jsConfig, dtsConfig];