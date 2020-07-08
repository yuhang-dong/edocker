import Vue from 'vue';
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
Vue.config.productionTip = false

// import http
var dockerode = require('dockerode');
Vue.prototype.$DOCKER = dockerode;

var fs = require('fs');
Vue.prototype.$fs = fs;
// import other
Vue.use(ViewUI);
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
