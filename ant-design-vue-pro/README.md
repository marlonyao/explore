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
主要按照极客时间课程 [Vue开发实战](https://time.geekbang.org/course/intro/100024601)，搭建类似 [Ant Design Pro Preview](https://preview.pro.ant.design/dashboard/analysis?fixSiderbar=true&colorWeak=false&pwa=false) 网站。

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

## 第二节：自定义 `Webpack` 和 `Babel` 的配置

### 先删掉 `App.vue` 和 `Home.vue` 里无关内容。

1. 删除 `App.vue` 里的样式代码。
2. 删除 `Home.vue` 里的 logo 和 `HelloWorld` 组件。

现在浏览器看到的是比较清爽的 ` Home | About `。

### 引入 `Antd` 组件库，并初步试用 `Button` 组件

1. 在入口文件 `main.js` 里全局引入 `Antd` 组件

```javascript
import Antd from "ant-design-vue"

// ......

Vue.use(Antd)
```

入口文件是 `webpack` 的概念，项目里看不到 `webpack.config.js`，但可以通过 [`npx vue-cli-service inspect`](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-inspect) 来得到生成的 `webpack` 配置。

2. 在 `App.vue` 里使用 `Button` 组件。

加在 `<div id="app">` 里面：

```html
<a-button>按钮<a-button>
```

现在在浏览器里应该能看到新加的 `button`，但是没有任何样式，因为我们还没有引入任何样式。

3. 引入 `Antd` 的 `css` 样式

在 `main.js` 里 `import css`：

```javascript
import "ant-design-vue/dist/antd.css"
```

现在在浏览器中就能看到 `button` 的样式生效了。

这里解释一下为什么能够在 `JavaScript` 里 `import css`，这是 `webpack` 做的事情，它会在 `<head>` 元素里创建一个 `<style>` 的节点，其内容就是 `ant-desigin-vue/dist/antd.css` 文件的内容。更多详细内容可以参考 `webpack-demo` 项目里的内容，也可以看官方文档 [Laoding CSS](https://webpack.js.org/guides/asset-management/#loading-css)。这里也有[一篇文章](https://www.jianshu.com/p/d2470f719fee)说明了 `css-loader` 和 `style-loader` 的原理。

4. 将引入的 `css` 改成 `less` 方便后续自定义样式

将上一步引入的 `antd.css` 改成 `antd.less`：

```javascript
import "ant-design-vue/dist/antd.less"
```

这个时候浏览器会报错，提示：

```
Failed to compile.

./node_modules/ant-design-vue/dist/antd.less (./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-3-1!./node_modules/postcss-loader/src??ref--10-oneOf-3-2!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-3-3!./node_modules/ant-design-vue/dist/antd.less)
Module build failed (from ./node_modules/less-loader/dist/cjs.js):


// https://github.com/ant-design/ant-motion/issues/44
.bezierEasingMixin();
^
Inline JavaScript is not enabled. Is it set in your options?
      in /Users/marlonyao/projects/explore/ant-design-vue-pro/node_modules/ant-design-vue/lib/style/color/bezierEasing.less (line 110, column 0)
```

提示没有开启 `Inline JavaScript`，在根目录下创建 `vue.config.js`，配置 [`css loaderOptions`](https://cli.vuejs.org/zh/config/#css-loaderoptions)，代码如下：

```
module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
        }
    }
}
```

重新运行：

```
npm run serve
```

应该能够在浏览器中看到 `button` 重新出现。

5. 只引入 `Button` 组件

以上步骤引入了 `Antd` 所有组件，这样就会导致生成的 `js` 文件很大，在浏览器看到最大的文件 chunk-vendor.js 达到15M。

我们可以只引入 `Button` 组件，这样可以降低生成 `js` 文件大小，`css` 同样如此，可以只引入 `Button` 组件的 `css`。

原来：

```javascript
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

Vue.use(Antd)
```

改成：

```javascript
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style";

Vue.use(Button)
```

区别如下：
- 现在 `chunk-vendor.js` 只有 6.3M 了。（感觉还是很大！)
- 在 `HTML DOM` 树中 `<header>` 原来只有一个 `<style>` 节点，里面是很大的 `antd.less` 的内容。现在有两个 `<style>` 节点，分别是 `ant-desigin-vue/style/index.less` 和 `ant-desigin-vue/lib/button/style/index.less` 的内容，原因可以参看 `ant-design-vue/lib/button/style` 里的内容。

6. 使用 `babel` 插件简化导入

以上每个组件导入比较繁琐，可以用 `babel` 插件简化导入。参考 [Ant Design Vue 按需加载说明](https://antdv.com/docs/vue/introduce-cn/#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)。

安装 `babel-plugin-import` 插件：

```
npm i --save-dev babel-plugin-import
```

修改 `babel.config.js`：

```javascript
module.exports = {
  // ...
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": true }] // `style: true` 会加载 less 文件
  ]
};
```

简化导入方式，原来的：

```javascript
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style";

Vue.use(Button)
```

就可以改成：
```javascript
import { Button } from "ant-design-vue";

Vue.use(Button)
```

重新运行看下 `chunk-vendor.js` 大小，应该还是 6.3M。

## 第三节：设计高扩展性的路由

[视频](https://time.geekbang.org/course/detail/100024601-91010)

### 实现登录页和注册页

1. 添加 `/user/login` 和 `/usr/register` 路由

在 `router/index.js` 里添加路由：

```javascript
  {
    path: "/user",
    component: UserRouterView,
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      },
    ]
  },
```

`/User/Login.vue` 和 `/User/Register.vue` 都使用了异步加载，参考 `Vue Router` 的[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)。

2. 创建 `router` 所需要的 `View`

上面需要三个 `View`，分别是 `UserRouterView`、`Login` 和 `Register`, 都放在 `views/User` 目录下。

`UserRouterView.vue`:

```html
<template>
    <router-view />
</template>
```

它只是分发组件，有 `<router-view />` 做一个占位。

`Login.vue`:

```html
<template>
    <div>登录页</div>
</template>
```

`Register.vue`:

```html
<template>
    <div>注册页</div>
</template>
```

运行起来之后，手动切换路径至 `/user/login` 或 `/user/register` 应该能够看到对应的登录页和注册页。

3. 去掉 `UserRouterView`

既然 `UserRouterView` 只是一个纯粹的分发，模板里只包含一个 `<router-view>` 标签，就可以用更简单的写法。

因为模板本质上就是一个 `render` 函数，可以写成：

```javascript
  {
    path: "/user",
    // 等价于 UserRouterView
    component: { render: h => h("router-view") },
    childrens: [
      ...
    ]
  }
```

这样就可以去掉 `UserRouterView` 了。

4. 使用 `UserLayout`

其实和最早的 `UserRouterView` 很类似，只不过换了个名字。

在 `src` 目录下创建 `layouts` 目录，新建 `UserLayout.vue` 文件，内容如下：

```html
<template>
  <div>
    <div class="desc">Ant Design Pro</div>
    <router-view/>
  </div>
</template>
```

在 `router/index.js` 使用 `UserLayout`：

```javascript
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      // ...
    ]
  }
```

5. 创建仪表盘页和表单页

和创建登录注册页类似，但使用 `BasicLayout` 模板。

`router/index.js` 内容如下：

```
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/dashboard/analysis",
        name: "analysis",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue")
      },
      {
        path: "/dashboard/monitor",
        name: "monitor",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Monitor.vue")
      },
      {
        path: "/dashboard/workspace",
        name: "workspace",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Workspace.vue")
      },
      {
        path: "/form/basic-form",
        name: "basic-form",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/BasicForm.vue")
      },
      {
        path: "/form/step-form",
        name: "step-form",
        redirect: "form/step-form/info"
      },
      {
        path: "/form/step-form/info",
        name: "step-form-info",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormInfo.vue")
      },
      {
        path: "/form/step-form/confirm",
        name: "step-form-confirm",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormConfirm.vue")
      },
      {
        path: "/form/step-form/result",
        name: "step-form-result",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepFormResult.vue")
      },
    ]
  },
```

我没有想视频中那样创建那么多层次的嵌套。

接下来就是创建对应的 `View`，目前就是提供一个简单的占位，以 `Dashboard/Analysis.vue` 举例：

```html
<template>
    <div>分析页</div>
</template>
```

剩下的 `View` 就不一一列列举了。

`BasicLayout` 内容如下：

```javascript
<template>
  <div>
    <Header/>
    <SiderMenu/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";

export default {
  components: {
    Header,
    Footer,
    SiderMenu
  }
}
</script>
```

需要创建 `Header.vue`, `Footer.vue` 和 `SiderMenu.vue`，也是简单的占位，不列举了。

6. 增加加载进度条

安装 [nprogress](https://ricostacruz.com/nprogress/) ：

```
npm i --save nprogress
```

在 `Vue Router` 的钩子里增加对 `NProgress` 的调用：

```
import NProgress from "nprogress";
import "nprogress/nprogress.css";

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done();
});
```

现在切换链接时应该能在浏览器顶部看到进度条的提示。

## 第四节：实现可动态改变的页面布局

[视频链接](https://time.geekbang.org/course/detail/100024601-91450)

1. 删掉 `App.vue` template 里的导航内容，只剩下：

```
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

2. 使用 `Layout` 组件布局 `BasicLayout`

从[这里](https://www.antdv.com/components/layout-cn/#components-layout-demo-sider)拷贝内容到 `layouts/BasicLayout.vue`，并将 `Header`、`router-view`、`SiderMenu`、`Footer` 填入合适的位置。

`BasicLayout.vue`:
```
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
        <Header/>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
```

3. 在 `main.js` 里引入 `Layout` 组件

```
import { Button, Layout } from "ant-design-vue";

Vue.use(Button);
Vue.use(Layout);
```

当引入 `Layout` 时，`babel-plugin-import` 会自动引入 `LayoutSider`、`LayoutHeader` 等组件，不用再引入。