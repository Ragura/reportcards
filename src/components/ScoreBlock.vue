<template>
  <div class="flex flex-col border border-b-0 border-black">
    <zill-header :zills="content.icons">{{ content.zillHeader }}</zill-header>

    <template v-if="content.layout === 'periode'">
      <score-title>Jaarpunten</score-title>
      <score-line v-for="id of content.jaarpunten" :key="id" :id="id" />

      <score-title>Periodepunten</score-title>
      <score-line v-for="id of content.periodepunten" :key="id" :id="id" />

      <score-comments
        class="row-commentaar border-b border-black"
        @blur.native="
          updatePunten({
            leerlingId: leerlingen[activeLeerling].id,
            evaluatieId: content.commentKey,
            value: $event.target.innerText
          })
        "
        v-html="leerlingen[activeLeerling].punten[content.commentKey]"
      ></score-comments>
    </template>

    <!-- <template v-else-if="content.layout === 'column'">
      <div
        class="flex flex-wrap w-full"
        v-for="block of content.blocks"
        :key="block.title"
      >
        <div
          class="w-full border-b border-black flex items-center font-bold col-title text-sm"
        >
          {{ block.title }}
        </div>
        <div class="w-1/2 flex flex-col">
          <score-line
            v-for="line of block.lines"
            :key="line.valueKey"
            :line="line"
          />
        </div>
        <score-comments
          class="w-1/2 border-b border-l border-black"
          @blur.native="
            updatePuntenLeerling({
              leerlingId: activeLeerlingId,
              key: block.valueKey,
              value: $event.target.innerText
            })
          "
          v-html="activeLeerling.punten[block.valueKey]"
        ></score-comments>
      </div>
    </template> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
    ...mapState(["leerlingen", "activeLeerling"])
  },
  methods: {
    ...mapActions(["updatePunten"])
  },
  created() {}
};
</script>

<style>
.col-title {
  padding: 0.2cm;
  padding-left: 0.2cm;
  padding-right: 0.2cm;
}

.row-commentaar {
  height: 2.4cm;
}
</style>
