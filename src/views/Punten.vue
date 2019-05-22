<template>
  <div class="punten">
    <h1 class="text-2xl uppercase pb-4 border-b border-gray-200 mb-4">
      Punten
    </h1>

    <accordion
      v-for="block of Object.values(blocks).filter(b => !b.rapportOnly)"
      :key="`block-${block.id}`"
      titleclass="bg-blue-400 text-white"
    >
      <div slot="title">{{ block.content.zillHeader }}</div>
      <div slot="content">
        <template v-for="(punt, index) of getPunten(block)">
          <accordion
            v-if="punt"
            :key="`punt-${index}`"
            titleclass="bg-blue-300 text-white"
          >
            <div slot="title">{{ evaluaties[punt].text }}</div>
            <score-table :punt="punt" slot="content" />
          </accordion>
        </template>
      </div>
    </accordion>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Accordion from "@/components/Accordion.vue";
import ScoreTable from "@/components/ScoreTable.vue";

export default {
  name: "Punten",
  components: {
    Accordion,
    ScoreTable
  },
  computed: {
    ...mapState(["evaluaties", "blocks"])
  },
  methods: {
    toggleOpenedBlock(id) {
      if (this.openedBlock === id) {
        this.openedBlock = "";
      } else {
        this.openedBlock = id;
      }
    },
    getPunten(block) {
      if (block.content.layout === "domein") {
        return block.content.domeinen1.concat(block.content.domeinen2);
      } else if (block.content.layout === "rij") {
        return block.content.punten;
      } else if (block.content.layout === "periode") {
        return block.content.jaarpunten.concat(block.content.periodepunten);
      }
      return [];
    }
  }
};
</script>

<style>
.punten {
  min-width: 480px;
}
</style>
