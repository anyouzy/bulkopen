/*
 * @Author: Tiger Zhang
 * @LastEditors: Tiger Zhang
 * @Date: 2019-08-08 19:06:15
 * @LastEditTime: 2019-08-11 21:17:57
 * @Description:
 */
//import Vue from "vue";
import Vuex from "vuex";

//Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allDomainList: JSON.parse(localStorage.getItem("allDomainList")) || [],
    currentPageDomainList: [],
    hasChangedPage: true,
    nextPageFirstDomain: "",
    currentPageLeftSpaces: 0 //当前分页  还剩下几个位置
  },
  mutations: {
    addDomain(state, inputDomains) {
      state.allDomainList = [...state.allDomainList, ...inputDomains];
      localStorage.setItem(
        "allDomainList",
        JSON.stringify(state.allDomainList)
      );
    },
    updateCurrentPageDomains(state, currentPageDomainList) {
      state.currentPageDomainList = currentPageDomainList;
    },
    removeDomain(state, domain) {
      state.allDomainList = state.allDomainList.filter(v => v !== domain);
      localStorage.setItem(
        "allDomainList",
        JSON.stringify(state.allDomainList)
      );
    },
    updateNextPageFirstDomain(state, domain) {
      state.nextPageFirstDomain = domain;
    },
    updatecurrentPageLeftSpaces(state, leftSpaces) {
      state.currentPageLeftSpaces = leftSpaces;
    },
    updateHasChangedPage(state, hasChanged) {
      state.hasChangedPage = hasChanged;
    },
    removeAllDomain(state) {
      state.currentPageDomainList = [];
      state.allDomainList = [];
      state.nextPageFirstDomain = "";
      localStorage.setItem("allDomainList", JSON.stringify([]));
    }
  },
  actions: {}
});
