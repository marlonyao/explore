<template>
  <div id="app">
    <a-button type="primary">Test</a-button>
  </div>
</template>

<script>
import Vue from 'vue';
//import Antd from 'ant-design-vue';
//import 'ant-design-vue/dist/antd.css';
//import Button from 'ant-design-vue/lib/button';
//import 'ant-design-vue/lib/button/style/css'
import { Button } from 'ant-design-vue'
//Vue.use(Antd);

Vue.use(Button);

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
</style>
