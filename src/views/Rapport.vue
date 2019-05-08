<template>
  <div class="rapport">
    <div class="toolbar mb-6 relative flex justify-between">
      <select
        id="leerling"
        class="block appearance-none w-64 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="selectedLeerling"
      >
        <option
          v-for="leerling of activeRapport.leerlingen"
          :key="leerling.id"
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

    <div class="page mx-auto border" v-for="n of 3" :key="n">
      <Header class="header" />

      <component
        class="rapport-block"
        :style="{ height: block.height || 'auto' }"
        v-for="block of activeRapport.rapportBlocks.filter(b => b.page === n)"
        :is="block.type"
        :content="block.content"
        :key="block.id"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Header from "@/layouts/Header.vue";
import Batteries from "@/components/Batteries.vue";
import ScoreBlock from "@/components/ScoreBlock.vue";
import ZillHeader from "@/components/ZillHeader.vue";
import ScoreTitle from "@/components/ScoreTitle.vue";
import ScoreLine from "@/components/ScoreLine.vue";
import ScoreComments from "@/components/ScoreComments.vue";

const ipc = require("electron").ipcRenderer;

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
    ScoreTitle,
    ScoreLine,
    ScoreComments,
    ZillHeader
  },
  computed: {
    ...mapState(["activeRapport", "activeLeerling"])
  },
  methods: {
    printen() {
      // this.printRapport(true);
      ipc.send("print-to-pdf");
    },
    ...mapMutations([`showModal`]),
    ...mapActions([
      "updateRapportInhoud",
      "changeActiveLeerlingId",
      "printRapport"
    ])
  },
  created() {
    this.changeActiveLeerlingId(this.activeRapport.leerlingen[0].id);
    this.selectedLeerling = this.activeRapport.leerlingen[0].id;

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
  padding: 1.5cm 2cm;

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
  @page {
    margin-top: 1.7cm;
    margin-bottom: 1.7cm;
    margin-left: 2cm;
    margin-right: 2cm;
  }

  .toolbar {
    display: none;
  }

  .page {
    padding: 0;
    width: 100%;
    height: auto;
    border: none;
    // page-break-before: always;
    break-before: page;
  }
}
</style>
