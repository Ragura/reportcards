<template>
  <div>
    <h1 class="text-2xl uppercase pb-4 border-b border-gray-200 mb-4">
      Punten
    </h1>

    <accordion
      v-for="block of Object.values(blocks)"
      :key="`block-${block.id}`"
      titleclass="bg-blue-400 text-white"
    >
      <div slot="title">{{ block.content.zillHeader }}</div>
      <div slot="content">
        <template v-if="block.content.layout === 'domein'">
          <accordion
            v-for="punt of block.content.domeinen1.concat(
              block.content.domeinen2
            )"
            :key="punt"
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
    }
  }
};
</script>

<style></style>
