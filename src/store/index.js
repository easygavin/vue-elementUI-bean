import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import getters from './getters';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  actions,
  getters,
  modules: {
    user,
  },
});
export default store;
