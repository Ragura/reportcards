<template>
  <div class="rapport">
    <div class="page mx-auto border">
      <Header class="header" />

      <!-- Leefhouding -->
      <score-block class="leefhouding flex flex-col">
        <zill-header slot="header" :zills="[1, 3, 6]">Leefhouding</zill-header>
        <score-title>Jaarpunten</score-title>
        <score-line
          >Ik aanvaard de mening van anderen en werk samen om tot een oplossing
          te komen</score-line
        >
        <score-line
          >Ik houd mij aan regels en afspraken omdat die nodig zijn voor een
          goede klas- en schoolwerking</score-line
        >
        <score-line>---</score-line>
        <score-title>Periodepunten</score-title>
        <score-line
          >Ik aanvaard de mening van anderen en werk samen om tot een oplossing
          te komen</score-line
        >
        <score-line
          >Ik houd mij aan regels en afspraken omdat die nodig zijn voor een
          goede klas- en schoolwerking</score-line
        >
        <score-comments class="flex-grow">Commentaar komt hier</score-comments>
      </score-block>

      <!-- Batterijen -->
      <div class="inzet flex border border-black">
        <div class="w-1/2 flex flex-col border-r border-black padding-klein">
          <div class="flex-shrink">Mijn inzet volgens de meester/juf</div>
          <Batteries
            class="flex-grow"
            @select="
              updateRapportInhoud({
                key: 'inzetJufMeester',
                leerling: activeLeerling.id,
                value: $event
              })
            "
            :battery="activeRapport.inhoud.inzetJufMeester[activeLeerling.id]"
          />
        </div>
        <div class="w-1/2 flex flex-col padding-klein">
          <div class="flex-shrink">Mijn inzet volgens mezelf</div>
          <Batteries
            class="flex-grow"
            :battery="activeRapport.inhoud.inzetMezelf[activeLeerling.id]"
          />
        </div>
      </div>

      <!-- Leukste dat je geleerd hebt? -->
      <div class="leukste flex border border-black">
        <div class="w-2/5 flex flex-col border-r border-black padding-klein">
          <img src="@/assets/images/leren.png" alt="" />
          <p class="flex-grow flex items-center">
            Het leukste wat ik heb geleerd de voorbije maanden:
          </p>
        </div>
        <div class="w-3/5"></div>
      </div>
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
