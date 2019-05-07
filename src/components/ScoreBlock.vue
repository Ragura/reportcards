<template>
  <div class="flex flex-col border border-black">
    <zill-header :zills="[1, 3, 6]">{{ content.zillHeader }}</zill-header>
    <div v-for="block of content.blocks" :key="block.title">
      <score-title>{{ block.title }}</score-title>
      <score-line v-for="line of block.lines" :key="line.text">{{
        line.text
      }}</score-line>
    </div>
    <score-comments class="flex-grow"></score-comments>
  </div>
</template>

<script>
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
  }
};
</script>

<style></style>
