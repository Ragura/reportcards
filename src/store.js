import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  modalVisible: false,
  modalComponent: null,
  activeRapport: null
};

export const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true;
    state.modalComponent = componentName;
  },
  hideModal(state) {
    state.modalVisible = false;
  },
  setActiveRapport(state, rapport) {
    state.activeRapport = rapport;
  }
};

export const actions = {};

export default new Vuex.Store({
  mutations,
  state,
  actions
});
