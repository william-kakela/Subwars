import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  actions: {
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },

})
