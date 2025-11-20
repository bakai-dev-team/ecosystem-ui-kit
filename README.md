# @bakai-ecosystem/ui-kit

React UI Kit библиотека компонентов для экосистемы Bakai

## 📦 Установка

```bash
npm install @bakai-ecosystem/ui-kit
```

## Быстрый старт

```
import { Button, Input } from '@bakai-ecosystem/ui-kit';

function App() {
  return (
    <div>
      <Button onClick={() => console.log('Clicked!')}>
        Нажми меня
      </Button>
      <Input placeholder="Введите текст" />
    </div>
  );
}

```


## Компоненты
Button
Кнопка с различными вариантами стилей

```
import { Button } from '@bakai-ecosystem/ui-kit';

<Button 
  variant="primary" 
  size="medium"
  onClick={() => {}}
>
  Текст кнопки
</Button>
```
Props:

variant: 'primary' | 'secondary' | 'outline' (default: 'primary')

size: 'small' | 'medium' | 'large' (default: 'medium')

disabled: boolean (default: false)

onClick: () => void

## Стилизация
Библиотека включает SCSS стили. Убедитесь что ваш проект поддерживает SCSS.

## Разработка
Установка для разработки

```bash
git clone https://github.com/bakai-dev-team/ecosystem-ui-kit.git
cd ui-kit
npm install
npm run dev
```

## Сборка
```bash
npm run build
```
## Лицензия



## package.json 

```json
{
  "name": "@bakai-ecosystem/ui-kit",
  "version": "1.0.4",
  "description": "React UI Kit библиотека компонентов для экосистемы Bakai",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "keywords": [
    "react",
    "ui-kit", 
    "components",
    "bakai",
    "typescript"
  ],
  "author": "Zhainak Nurlan nurlanuuluzajnak75@gmail.com",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/bakai-dev-team/ecosystem-ui-kit.git"
  },
  "scripts": {
    "clean": "rm -rf dist",
    "build": "npm run build:js && npm run build:types && npm run copy:styles && npm run copy:svg-icons",
    "build:js": "tsc --project tsconfig.build.json --outDir dist --skipLibCheck",
    "build:types": "tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --outDir dist --skipLibCheck",
    "copy:svg-icons": "node copy-svg-icons.mjs",
    "copy:styles": "node copy-styles.mjs",
    "dev": "vite",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-alias": "^5.0.0",
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-json": "^6.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "@rollup/plugin-url": "^8.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-dts": "^6.0.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.0",
    "typescript": "^5.0.0",
    "sass": "^1.60.0",
    "fs-extra": "^11.0.0",
    "@storybook/react": "^7.0.0",
    "@storybook/addon-essentials": "^7.0.0",
    "@storybook/addon-interactions": "^7.0.0",
    "@storybook/blocks": "^7.0.0",
    "@storybook/test": "^7.0.0",
    "storybook": "^7.0.0"
  }
}
```
## 📖 Storybook документация

Для просмотра всех компонентов и примеров использования:

```bash
npm run storybook
```