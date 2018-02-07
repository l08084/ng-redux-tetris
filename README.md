# Angular5Tetris

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## TS2503: Cannot find namespace'NodeJS'.エラーが発生したときの対応
```bash
# typingsをインストールしていない場合
$ npm install -g typings

$ typings install dt~node --global --save-dev
```

1. プロジェクトディレクトリ上でターミナルを開き、`typings install dt~node --global --save-dev`コマンドを実施(※)
※typingsがインストールされていない場合は、`npm install -g typings`で事前にインストールが必要

2. 上記コマンドの結果、typingsディレクトリが作成される

3. tsconfig.jsonに` "include": ["typings/index.d.ts"]`を追加
```javascript
{
  "compileOnSave": false,
  // ここから
  "include": [
    "typings/index.d.ts"
  ],
  // ここまでを追加
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
