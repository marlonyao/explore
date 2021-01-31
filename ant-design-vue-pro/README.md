# ant-design-vue-pro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# 内容说明
主要按照极客时间课程[Vue开发实战](https://time.geekbang.org/course/intro/100024601)，搭建类似 [Ant Design Pro Preview](https://preview.pro.ant.design/dashboard/analysis?fixSiderbar=true&colorWeak=false&pwa=false) 网站。

## 第一节：创建项目

### 创建项目 ant-design-vue-pro

```
vue create ant-design-vue-pro
```

手动选择：
1. Babel、Router、Vuex、CSS Pre-processors、Linter/Formatter、Unit Testing；
2. 选择history mode for router；
3. CSS预处理器使用Less；
4. Linker/Formatter配置选择使用 ESLint+Prettier；Lint features同时选择Lint on Save，Lint and fix on commit；
5. Unit Testing选择Jest；
6. 配置使用dedicated config files；
7. preset可以保存为 ant-design-pro-vue。

### 安装ant design vue和moment库

```
cd ant-design-vue-pro
npm i ant-design-vue moment --save
```

### 运行起来

```
npm run serve
```

按照提示打开链接，现在还只是 `Vue` 的默认页面。

