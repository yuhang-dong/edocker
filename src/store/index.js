import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
      connectUrl: "http://127.0.0.1:8779",
    },
    mutations: {
      storeUrl (state, newUrl) {
        state.connectUrl = newUrl;
      }
    }
  });