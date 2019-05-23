<template>
  <div>
    <h3 class="mb-2">NEW VERSION 2</h3>
    <h3 class="mb-2">Available: {{ available }}</h3>
    <h3 class="mb-2">Downloaded: {{ downloaded }}</h3>
    <h3 class="mb-2">Error: {{ error }}</h3>
    <h1 class="text-2xl uppercase pb-4 border-b border-gray-200 mb-4">
      Nieuw rapport
    </h1>
    <div
      class="w-1/5 h-32 border border-gray-200 flex justify-center items-center"
    >
      <i
        @click="showModal('ModalNieuwRapport')"
        class="material-icons md-48 cursor-pointer opacity-25 hover:opacity-100"
        >library_add</i
      >
    </div>
    <h1 class="text-2xl uppercase pt-8 pb-4 border-b border-gray-200 mb-4">
      Open rapport
    </h1>
    <div
      class="w-1/5 h-32 border border-gray-200 flex justify-center items-center"
    >
      <i
        @click="openRapport"
        class="material-icons md-48 cursor-pointer opacity-25 hover:opacity-100"
        >library_books</i
      >
    </div>
  </div>
</template>

<script>
const { dialog } = require("electron").remote;
const { ipcRenderer } = require("electron");
const log = require("electron-log");

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      checking: "",
      available: "",
      downloaded: "",
      error: ""
    };
  },
  computed: {
    ...mapState(["settings"])
  },
  methods: {
    ...mapMutations(["showModal"]),
    ...mapActions(["loadRapport"]),
    openRapport() {
      const rapportPath = dialog.showOpenDialog({
        title: "Open een rapport",
        defaultPath: this.settings.standardLocation,
        filters: [{ name: "Rapport", extensions: ["rap"] }],
        properties: ["openFile"],
        message: "Kies rapportbestand om het te openen."
      });

      if (!rapportPath) return;

      this.loadRapport(rapportPath[0]);
      this.$router.push("/rapport");
    }
  },
  created() {
    ipcRenderer.on("update-available", (event, data) => {
      log.info("UPDATE AVAILABLE");
      this.available = data;
    });
    ipcRenderer.on("update-downloaded", (event, data) => {
      log.info("UPDATE DOWNLOADED");
      this.downloaded = data;
    });

    ipcRenderer.on("error", (event, err) => {
      log.info("ERROR: " + err);
      this.error = err;
    });
  }
};
</script>

<style></style>
