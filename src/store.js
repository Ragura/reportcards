const jsonfile = require("jsonfile");
const { app } = require("electron").remote;

import uniqid from "uniqid";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  modalVisible: false,
  modalComponent: null,
  modalData: {},
  activeRapport: {
    rapportBlocks: [],
    leerlingen: []
  },
  activeLeerlingId: "",
  activePath: "",
  rapportChanged: false,
  settings: {
    standardLocation: "",
    marginTop: 1.4,
    marginBottom: 0,
    marginLeft: 2,
    marginRight: 2
  },
  printing: false
};

export const getters = {
  activeLeerling(state) {
    return state.activeRapport.leerlingen.find(l => {
      return l.id === state.activeLeerlingId;
    });
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
  passModalData(state, modalData) {
    state.modalData = { ...modalData };
  },
  setActiveRapport(state, { rapport, path }) {
    state.activeRapport = { ...rapport };
    state.activePath = path;
  },
  updateSettings(state, settings) {
    console.log(settings);

    state.settings = { ...settings };
  },
  changeActiveLeerlingId(state, leerlingId) {
    state.activeLeerlingId = leerlingId;
  },
  updatePuntenLeerling(state, { leerlingId, key, value }) {
    const indexOfLeerling = state.activeRapport.leerlingen.findIndex(
      l => l.id === leerlingId
    );
    Vue.set(state.activeRapport.leerlingen[indexOfLeerling].punten, key, value);
  },
  updateRapportText(state, { line, value }) {
    line.text = value;
  },
  printRapport(state, print) {
    state.printing = print;
  },
  addLeerling(state, { voornaam, familienaam }) {
    state.activeRapport.leerlingen.push({
      id: uniqid(),
      voornaam,
      familienaam,
      punten: {}
    });
  },
  deleteLeerling(state, leerlingId) {
    const leerlingIndex = state.activeRapport.leerlingen.findIndex(
      l => l.id === leerlingId
    );

    if (leerlingIndex >= 0) {
      state.activeRapport.leerlingen.splice(leerlingIndex, 1);
    }
  },
  editLeerling(state, { leerlingId, voornaam, familienaam }) {
    const leerlingIndex = state.activeRapport.leerlingen.findIndex(
      l => l.id === leerlingId
    );

    if (leerlingIndex >= 0) {
      state.activeRapport.leerlingen[leerlingIndex].voornaam = voornaam;
      state.activeRapport.leerlingen[leerlingIndex].familienaam = familienaam;
    }
  },
  addLeerlingen(state, leerlingen) {
    console.log(leerlingen);

    state.activeRapport.leerlingen = state.activeRapport.leerlingen.concat(
      leerlingen
    );
  }
};

export const actions = {
  passModalData({ commit }, modalData) {
    commit("passModalData", modalData);
  },
  fetchSettings({ commit, dispatch }) {
    const path = app.getPath("userData");
    try {
      const data = jsonfile.readFileSync(path + "\\settings.json");
      commit("updateSettings", data);
    } catch (err) {
      console.log(err);
      dispatch("writeSettings", {
        standardLocation: app.getPath("documents"),
        marginTop: 1.4,
        marginBottom: 0,
        marginLeft: 2,
        marginRight: 2
      });
    }
  },
  writeSettings({ commit }, settings) {
    const path = app.getPath("userData") + "\\settings.json";
    jsonfile.writeFileSync(path, settings, { spaces: 2 });
    commit("updateSettings", settings);
  },
  setActiveRapport({ commit }, payload) {
    commit("setActiveRapport", payload);
  },
  writeRapport({ state }) {
    jsonfile.writeFile(state.activePath, state.activeRapport, {
      spaces: 2
    });
  },
  changeActiveLeerlingId({ commit }, leerlingId) {
    commit("changeActiveLeerlingId", leerlingId);
  },
  updatePuntenLeerling({ commit, dispatch }, payload) {
    commit("updatePuntenLeerling", payload);
    dispatch("writeRapport");
  },
  updateRapportText({ commit, dispatch }, payload) {
    commit("updateRapportText", payload);
    dispatch("writeRapport");
  },
  printRapport({ commit }, payload) {
    commit("printRapport", payload);
  },
  addLeerling({ commit, dispatch }, payload) {
    commit("addLeerling", payload);
    dispatch("writeRapport");
  },
  deleteLeerling({ commit, dispatch }, leerlingId) {
    commit("deleteLeerling", leerlingId);
    dispatch("writeRapport");
  },
  editLeerling({ commit, dispatch }, payload) {
    commit("editLeerling", payload);
    dispatch("writeRapport");
  },
  addLeerlingen({ commit, dispatch }, leerlingen) {
    commit("addLeerlingen", leerlingen);
    dispatch("writeRapport");
  }
};

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions
});
