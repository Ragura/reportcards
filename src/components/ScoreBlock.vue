<template>
  <div class="flex flex-col border border-black">
    <zill-header :zills="[1, 3, 6]">{{ content.zillHeader }}</zill-header>
    <div v-for="block of content.blocks" :key="block.title">
      <score-title>{{ block.title }}</score-title>
      <score-line
        v-for="line of block.lines"
        :key="line.valueKey"
        :line="line"
      />
    </div>
    <score-comments
      class="flex-grow"
      @blur.native="
        updatePuntenLeerling({
          leerlingId: activeLeerlingId,
          key: content.valueKey,
          value: $event.target.innerText
        })
      "
      v-html="activeLeerling.punten[content.valueKey]"
    ></score-comments>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import ZillHeader from "@/components/ZillHeader.vue";
import ScoreTitle from "@/components/ScoreTitle.vue";
import ScoreLine from "@/components/ScoreLine.vue";
import ScoreComments from "@/components/ScoreComments.vue";

export default {
  name: "ScoreBlock",
  components: {
    ScoreTitle,
    ScoreLine,
    ScoreComments,
    ZillHeader
  },
  props: {
    content: {
      type: Object
    }
  },
  computed: {
    ...mapState(["activeRapport", "activeLeerlingId"]),
    ...mapGetters(["activeLeerling"])
  },
  methods: {
    ...mapActions(["updatePuntenLeerling"])
  },
  created() {}
};
</script>

<style></style>
