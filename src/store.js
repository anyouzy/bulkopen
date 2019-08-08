/*
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-08 21:43:59
 * @Description: 
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allDomainList: JSON.parse(localStorage.getItem('allDomainList')) || [],
    currentPageDomainList: []
  },
  mutations: {
    addDomain(state, inputDomains) {
      state.allDomainList = [...state.allDomainList, ...inputDomains];
      localStorage.setItem('allDomainList', JSON.stringify(state.allDomainList));
    },
    updateCurrentPageDomains(state, currentPageDomainList) {
      state.currentPageDomainList = currentPageDomainList;
    }
  },
  actions: {
    addDomain({ commit }, inputDomains) {
      commit('addDomain', inputDomains);
    },
    updateCurrentPageDomains({ commit }, currentPageDomainList) {
      commit('updateCurrentPageDomains', currentPageDomainList);
    }
  }
});
