import Vue from 'vue';
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// import http
var http = require('request');
Vue.prototype.$ajax = http;


// import other
Vue.use(Antd);
Vue.use(VueRouter);



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
