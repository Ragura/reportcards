<template>
  <div class="rapport">
    <div class="page mx-auto border">
      <Header class="header" />

      <!-- Batterijen -->
      <div class="inzet flex border border-black">
        <div class="w-1/2 flex flex-col border-r border-black padding-klein">
          <div class="flex-shrink">Mijn inzet volgens de meester/juf</div>
          <Batteries class="flex-grow" :battery="3" />
        </div>
        <div class="w-1/2 flex flex-col padding-klein">
          <div class="flex-shrink">Mijn inzet volgens mezelf</div>
          <Batteries class="flex-grow" :battery="2" />
        </div>
      </div>

      <!-- Leukste dat je geleerd hebt? -->
      <div class="leukste flex border border-black">
        <div class="w-2/5 flex flex-col border-r border-black padding-klein">
          <img src="@/assets/images/leren.jpg" alt="" />
          <p class="flex-grow flex items-center">
            Het leukste wat ik heb geleerd de voorbije maanden:
          </p>
        </div>
        <div class="w-3/5"></div>
      </div>

      <!-- Leefhouding -->
      <!-- Leefhouding -->
      <ScoreBlock class="leefhouding border border-black">
        <ZillHeader
          slot="header"
          :zills="[1, 3, 6]"
          headerTitle="Leefhouding"
        ></ZillHeader>
      </ScoreBlock>
      <!-- <div class="leefhouding border border-black"></div> -->
    </div>

    <div class="page mx-auto border">
      <Header class="header" />

      <!-- Batterijen -->
      <div class="inzet flex border border-black">
        <div class="w-1/2 flex flex-col border-r border-black padding-klein">
          <div class="flex-shrink">Mijn inzet volgens de meester/juf</div>
          <Batteries class="flex-grow" :battery="3" />
        </div>
        <div class="w-1/2 flex flex-col padding-klein">
          <div class="flex-shrink">Mijn inzet volgens mezelf</div>
          <Batteries class="flex-grow" :battery="2" />
        </div>
      </div>

      <!-- Leukste dat je geleerd hebt? -->
      <div class="leukste flex border border-black">
        <div class="w-2/5 flex flex-col border-r border-black padding-klein">
          <img src="@/assets/images/leren.jpg" alt="" />
          <p class="flex-grow flex items-center">
            Het leukste wat ik heb geleerd de voorbije maanden:
          </p>
        </div>
        <div class="w-3/5"></div>
      </div>

      <!-- Leefhouding -->
      <ScoreBlock class="leefhouding border border-black">
        <ZillHeader
          slot="header"
          :zills="[1, 3, 6]"
          headerTitle="Leefhouding"
        ></ZillHeader>
        <template slot="content">
          <ScoreTitle text="Jaarpunten" />
        </template>
      </ScoreBlock>
      <!-- <div class="leefhouding border border-black"></div> -->
    </div>

    <button class="mt-4" @click="printen">Maak PDF</button>
  </div>
</template>

<script>
import Header from "@/layouts/Header.vue";
import Batteries from "@/components/Batteries.vue";
import ScoreBlock from "@/components/ScoreBlock.vue";
import ZillHeader from "@/components/ZillHeader.vue";
import ScoreTitle from "@/components/ScoreTitle.vue";

const ipc = require("electron").ipcRenderer;

ipc.on("wrote-pdf", (event, path) => {
  const message = `Wrote pdf to: ${path}`;
  console.log(message);
});

export default {
  name: "rapport",
  components: {
    Header,
    Batteries,
    ScoreBlock,
    ScoreTitle,
    ZillHeader
  },
  methods: {
    printen() {
      ipc.send("print-to-pdf");
    }
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
