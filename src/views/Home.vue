<template>
  <div>
    <h1 class="text-2xl uppercase pt-8 pb-4 border-b border-gray-200 mb-4">
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
const fs = require("fs");
const { app, dialog } = require("electron").remote;
import { mapMutations } from "vuex";

export default {
  name: "Home",
  methods: {
    openRapport() {
      const rapportPath = dialog.showOpenDialog({
        title: "Kies map voor rapporten",
        defaultPath: app.getAppPath(),
        properties: ["openFile"],
        message: "Kies een map waar rapporten worden opgeslagen"
      });
      const rapport = JSON.parse(fs.readFileSync(rapportPath[0]));
      this.setActiveRapport(rapport);
    },
    ...mapMutations(["showModal", "setActiveRapport"])
  }
};
</script>

<style></style>
