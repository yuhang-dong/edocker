import Vuex from 'vuex'

import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      connectUrl: "http://127.0.0.1:8779",
    },
    mutations: {
      storeUrl (state, newUrl) {
        state.connectUrl = newUrl;
        console.log(newUrl);
      }
    }
  });