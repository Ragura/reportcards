<template>
  <div class="rapport">
    <div class="page mx-auto border">
      <Header class="header" />

      <component
        class="rapport-block"
        :style="{ height: block.height }"
        v-for="block of activeRapport.rapportBlocks"
        :is="block.type"
        :content="block.content"
        :key="block.id"
      />
    </div>

    <div class="page mx-auto border">
      <Header class="header" />
    </div>

    <button class="mt-4" @click="printen">Maak PDF</button>
    <button @click="showModal('ModalSettings')">
      Login
    </button>
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

ipc.on("wrote-pdf", (event, path) => {
  // eslint-disable-next-line
  const message = `Wrote pdf to: ${path}`;
});

export default {
  name: "rapport",
  data() {
    return {
      activeLeerling: {}
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
    ...mapState(["activeRapport"])
  },
  methods: {
    printen() {
      ipc.send("print-to-pdf");
    },
    ...mapMutations([`showModal`]),
    ...mapActions(["updateRapportInhoud"])
  },
  created() {
    this.activeLeerling = { ...this.activeRapport.leerlingen[0] };
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 21cm;
  height: 29.7cm;
  padding: 1.7cm 2cm;

  .padding-klein {
    padding: 0.2cm;
  }

  .header {
    margin-bottom: 0.9cm;
  }
}

.rapport-block {
  margin-bottom: 0.9cm;
}

.inzet {
  height: 3.1cm;
  margin-bottom: 0.9cm;
}

.leukste {
  height: 3.4cm;
  margin-bottom: 0.9cm;

  img {
    height: 1.7cm;
  }
}

.leefhouding {
  height: 13.5cm;
}

@media print {
  @page {
    margin-top: 1.7cm;
    margin-bottom: 1.7cm;
    margin-left: 2cm;
    margin-right: 2cm;
  }

  button {
    display: none;
  }

  .page {
    padding: 0;
    width: 100%;
    height: auto;
    border: none;
    page-break-after: always;
  }
}
</style>
