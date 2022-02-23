# Webpack

## mode

mode가 development면 개발용, production이면 배포용이다.<br>
webpack4에서 추가되었다.

## entry

웹팩이 파일을 읽어들이기 시작하는 부분이다.<br>
두개의 js 파일을 생성하고 싶으면 두개의 파일을 명시한다.<br>

```js
entry: {
  app: './src/index.js',
  blue: './src/blue.js'
}
```

여러 파일을 넣고싶을 경우 배열을 사용한다.<br>

```js
entry: {
  app: ['a.js', 'b.js'];
}
```

## output

- path

  output으로 나올 파일이 저장될 경로이다.

- filename

  [name].js [name]에 entry의 app 문자열이 들어가 있으면 app.js<br>
  app.js라고 적으면 그대로 app.js로 결과물이 나온다.

- publicPath

  파일들이 위치할 서버 상의 경로

## resolve

- extensions

  확장자를 순서대로 해석한다.

## loader

```shell
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

babel-loader와 @babel/core는 필수이고 나머지 preset는 선택이다.<br>
preset-react는 react 할때 설치한다.<br>
preset-env는 브라우저에 필요한 ecmascript 버전을 자동으로 파악해서 알아서 polyfill을 넣어준다.

## plugins

## devServer

```shell
npm i -D webpack-dev-server
```

```js
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

### devServer.devMiddleware

```js
module.exports = {
  devServer: {
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: '/publicPathForDevServe',
      serverSideRender: true,
      writeToDisk: true,
    },
  },
};
devSe;
```

[webpack-dev-middleware]

### devServer.hot

Hot Module Replacement(HMR)는 모듈 전체를 다시 로드하지 않고 애플리케이션이 실행되는 동안 교환, 추가 또는 제거한다.

```js
module.exports = {
  //...
  devServer: {
    hot: true,
  },
};
```

```shell
npx webpack serve --hot
```

[webpack 공식문서](https://webpack.js.org/concepts/)
[웹팩5(Webpack) 설정하기](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d)
