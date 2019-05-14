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

  meta: {
    schooljaar: "",
    leerjaar: 1,
    klas: "",
    periode: 1
  },

  leerlingen: {},
  evaluaties: {},
  blocks: [],

  activePath: "",
  activeLeerling: "",

  settings: {
    standardLocation: "",
    marginTop: 1.4,
    marginBottom: 0,
    marginLeft: 2,
    marginRight: 2
  },
  printing: false
};

export const getters = {};

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
  updateSettings(state, settings) {
    state.settings = { ...settings };
  },
  readRapport(state, { path, rapport }) {
    state.activePath = path;
    state.meta = rapport.meta;
    state.leerlingen = rapport.leerlingen;
    state.evaluaties = rapport.evaluaties;
    state.blocks = rapport.blocks;
  },
  setActiveLeerling(state, id) {
    state.activeLeerling = id;
  },
  addLeerling(state, { voornaam, familienaam }) {
    const id = uniqid();
    Vue.set(state.leerlingen, id, {
      id,
      voornaam,
      familienaam,
      punten: {}
    });
  },
  addLeerlingen(state, leerlingen) {
    state.leerlingen = { ...state.leerlingen, ...leerlingen };
  },
  updateLeerling(state, { id, voornaam, familienaam }) {
    state.leerlingen[id].voornaam = voornaam;
    state.leerlingen[id].familienaam = familienaam;
  },
  deleteLeerling(state, id) {
    Vue.delete(state.leerlingen, id);
  },
  updatePunten(state, { leerlingId, evaluatieId, value }) {
    Vue.set(state.leerlingen[leerlingId].punten, evaluatieId, value);
  },
  updatePuntenArray(state, { leerlingId, evaluatieId, index, value }) {
    if (isNaN(value)) value = null;
    Vue.set(state.leerlingen[leerlingId].punten[evaluatieId], index, value);
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

  // Initialize new rapport
  // Payload: path, rapport
  createRapport({ commit, dispatch }, payload) {
    commit("readRapport", payload);
    dispatch("writeRapport");
  },

  // Write rapport to file
  writeRapport({ state }) {
    jsonfile.writeFileSync(
      state.activePath,
      {
        meta: state.meta,
        leerlingen: state.leerlingen,
        evaluaties: state.evaluaties,
        blocks: state.blocks
      },
      {
        spaces: 2
      }
    );
  },

  // Load rapport from file
  loadRapport({ commit }, path) {
    const rapport = jsonfile.readFileSync(path, { spaces: 2 });
    if (rapport) {
      commit("readRapport", { path, rapport });
    }
  },

  // Set active leerling
  setActiveLeerling({ commit }, id) {
    commit("setActiveLeerling", id);
  },

  // Add new leerling
  // Payload: voornaam, familienaam
  addLeerling({ commit, dispatch }, payload) {
    commit("addLeerling", payload);
    dispatch("writeRapport");
  },

  // Add a batch of new leerlingen
  addLeerlingen({ commit, dispatch }, leerlingen) {
    commit("addLeerlingen", leerlingen);
    dispatch("writeRapport");
  },

  // Update existing leerling
  // Payload: id, voornaam, familienaam
  updateLeerling({ commit, dispatch }, payload) {
    commit("updateLeerling", payload);
    dispatch("writeRapport");
  },

  // Delete existing leerling
  deleteLeerling({ commit, dispatch }, id) {
    commit("deleteLeerling", id);
    dispatch("writeRapport");
  },

  // Update punten of leerling
  // Payload: leerlingId, evaluatieId, value
  updatePunten({ commit, dispatch }, payload) {
    commit("updatePunten", payload);
    dispatch("writeRapport");
  },

  // Update punten array of leerling
  // Payload: leerlingId, evaluatieId, index, value
  updatePuntenArray({ commit, dispatch }, payload) {
    commit("updatePuntenArray", payload);
    dispatch("writeRapport");
  }
};

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions
});
