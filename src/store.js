import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  modalVisible: false,
  modalComponent: null,
  activeRapport: null,
  settings: {
    standaardLocatie: "",
    marginTop: 1.7,
    marginBottom: 1.7,
    marginLeft: 2,
    marginRight: 2
  }
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

export const actions = {
  actions: {
    // fetchSettings({ commit }) {
    //   // commit("updateSettings", payload);
    // }
  }
};

export default new Vuex.Store({
  mutations,
  state,
  actions
});
