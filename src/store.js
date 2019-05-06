const jsonfile = require("jsonfile");
const { app } = require("electron").remote;

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  modalVisible: false,
  modalComponent: null,
  activeRapport: null,
  activePath: "",
  rapportChanged: false,
  settings: {
    standardLocation: "",
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
  setActiveRapport(state, { rapport, path }) {
    state.activeRapport = { ...rapport };
    state.activePath = path;
  },
  updateSettings(state, settings) {
    state.settings = { ...settings };
  },
  updateRapportInhoud(state, { key, leerling, value }) {
    Vue.set(state.activeRapport.inhoud[key], leerling, value);
  }
};

export const actions = {
  async fetchSettings({ commit, dispatch }) {
    const path = app.getPath("userData");

    try {
      const data = await jsonfile.readFile(path + "/settings.json");
      commit("updateSettings", data);
    } catch (err) {
      console.log(err);
      dispatch("writeSettings", {
        standardLocation: app.getPath("documents"),
        marginTop: 1.7,
        marginBottom: 1.7,
        marginLeft: 2,
        marginRight: 2
      });
    }
  },
  async writeSettings({ commit }, settings) {
    const path = app.getPath("userData") + "/settings.json";
    await jsonfile.writeFile(path, settings, { spaces: 2 });
    commit("updateSettings", settings);
  },
  setActiveRapport({ commit }, payload) {
    commit("setActiveRapport", payload);
  },
  updateRapportInhoud({ commit, dispatch }, payload) {
    commit("updateRapportInhoud", payload);
    dispatch("writeRapport");
  },
  writeRapport({ state }) {
    jsonfile.writeFile(state.activePath, state.activeRapport, {
      spaces: 2
    });
  }
};

export default new Vuex.Store({
  mutations,
  state,
  actions
});
