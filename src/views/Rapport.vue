<template>
  <div class="rapport">
    <div class="toolbar mb-6 relative flex justify-between">
      <select
        id="leerling"
        class="block appearance-none w-64 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="selectedLeerling"
      >
        <option
          v-for="leerling of leerlingenArray"
          :key="`select-${leerling.id}`"
          :value="leerling.id"
          >{{ leerling.familienaam }} {{ leerling.voornaam }}</option
        >
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-56 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
      <button
        @click="printen"
        class="flex items-center bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight outline-none focus:outline-none hover:bg-white hover:border-gray-500"
      >
        <i class="material-icons mr-2">print</i>Printen
      </button>
    </div>

    <template v-if="leerlingenArray.length">
      <div
        class="page mx-auto border"
        v-for="n of 3"
        :key="n"
        :style="{
          padding: `${settings.marginTop}cm ${settings.marginRight}cm ${
            settings.marginBottom
          }cm ${settings.marginLeft}cm`
        }"
      >
        <Header class="header" />
        <component
          class="rapport-block"
          v-for="block of Object.values(blocks)
            .filter(b => b.page === n)
            .sort((a, b) => a.order - b.order)"
          :is="block.type"
          :content="block.content"
          :key="`block-${block.id}`"
        />
      </div>
    </template>

    <div v-else>
      <h2 class="text-2xl">
        Voeg leerlingen toe vooraleer de rapporten zichtbaar worden.
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Header from "@/layouts/Header.vue";
import Batteries from "@/components/Batteries.vue";
import ScoreBlock from "@/components/ScoreBlock.vue";
import FinalComments from "@/components/FinalComments.vue";
import Signature from "@/components/Signature.vue";
import Question from "@/components/Question.vue";

const ipc = require("electron").ipcRenderer;
const { dialog } = require("electron").remote;

export default {
  name: "rapport",
  data() {
    return {
      selectedLeerling: {}
    };
  },
  components: {
    Header,
    Batteries,
    ScoreBlock,
    FinalComments,
    Signature,
    Question
  },
  watch: {
    selectedLeerling(newValue) {
      this.setActiveLeerling(newValue);
    }
  },
  computed: {
    ...mapState([
      "meta",
      "evaluaties",
      "blocks",
      "leerlingen",
      "activeLeerling",
      "settings",
      "activePath"
    ]),
    leerlingenArray() {
      if (this.leerlingen && Object.keys(this.leerlingen).length > 0) {
        return Object.values(this.leerlingen);
      }
      return [];
    }
  },
  methods: {
    printen() {
      const path = dialog.showSaveDialog({
        title: "PDF opslaan",
        defaultPath:
          this.settings.standardLocation +
          this.activePath.replace(
            ".rap",
            `_${this.leerlingen[this.activeLeerling].voornaam}_${
              this.leerlingen[this.activeLeerling].familienaam
            }.pdf`
          ),
        message: "Kies locatie om PDF op te slaan."
      });

      if (!path) return;
      this.printRapport(true);
      ipc.send("print-to-pdf", path);
    },
    ...mapMutations([`showModal`]),
    ...mapActions(["updateRapportInhoud", "setActiveLeerling", "printRapport"])
  },
  created() {
    if (this.leerlingenArray.length > 0) {
      this.selectedLeerling = this.leerlingenArray[0].id;
      this.setActiveLeerling(this.leerlingenArray[0].id);
    }

    ipc.on("wrote-pdf", (event, path) => {
      // eslint-disable-next-line
      const message = `Wrote pdf to: ${path}`;

      this.printRapport(false);
    });
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 21cm;
  height: 29.7cm;

  .padding-klein {
    padding: 0.2cm;
  }

  .header {
    margin-bottom: 0.9cm;
  }
}

.rapport-block {
  margin-bottom: 0.5cm;
}

@media print {
  .toolbar {
    display: none;
  }

  .page {
    width: 100%;
    height: auto;
    border: none;
    page-break-after: always;
    break-after: page;
  }
}
</style>
