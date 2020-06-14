import Vue from 'vue';
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
Vue.config.productionTip = false
var http = require('request');
Vue.use(Antd);
Vue.use(VueRouter);

Vue.prototype.$ajax = http;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
