import Vuex from 'vuex'

import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      connectUrl: "192.168.159.129:5678",
    },
    mutations: {
      storeUrl (state, newUrl) {
        state.connectUrl = newUrl;
      }
    }
  });