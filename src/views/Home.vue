<template>
  <div>
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
const jsonfile = require("jsonfile");

const { dialog } = require("electron").remote;
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["settings"])
  },
  methods: {
    ...mapMutations(["showModal"]),
    ...mapActions(["setActiveRapport"]),
    openRapport() {
      const rapportPath = dialog.showOpenDialog({
        title: "Open een rapport",
        defaultPath: this.settings.standardLocation,
        properties: ["openFile"],
        message: "Kies rapportbestand om het te openen."
      });

      if (!rapportPath) return;

      const rapport = jsonfile.readFileSync(rapportPath[0]);
      this.setActiveRapport({ rapport, path: rapportPath[0] });

      this.$router.push("/rapport");
    }
  }
};
</script>

<style></style>
