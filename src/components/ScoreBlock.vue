<template>
  <div class="flex flex-col border border-b-0 border-black">
    <zill-header :zills="content.icons">{{ content.zillHeader }}</zill-header>

    <template v-if="content.layout === 'periode'">
      <score-title>Jaarpunten</score-title>
      <color-line v-for="id of content.jaarpunten" :key="`jp-${id}`" :id="id" />

      <score-title>Periodepunten</score-title>
      <color-line
        v-for="id of content.periodepunten"
        :key="`pp-${id}`"
        :id="id"
      />

      <score-comments
        class="row-commentaar border-b border-black"
        @blur.native="
          updatePunten({
            leerlingId: activeLeerling,
            evaluatieId: content.commentKey,
            value: $event.target.value
          })
        "
        v-html="leerlingen[activeLeerling].punten[content.commentKey]"
      ></score-comments>
    </template>

    <template v-else-if="content.layout === 'domein'">
      <div v-for="n of 2" :key="n">
        <div class="flex flex-wrap w-full">
          <div
            class="w-full border-b border-black flex items-center font-bold col-title text-sm"
          >
            {{ content[`subtitel${n}`] }}
          </div>
          <div class="w-full flex overflow-hidden">
            <div class="w-1/2 flex flex-col">
              <color-line
                v-for="id of content[`domeinen${n}`]"
                :key="`domein${n}-${id}`"
                :id="id"
              />
            </div>
            <score-comments
              class="w-1/2 border-b border-l border-black"
              @blur.native="
                updatePunten({
                  leerlingId: activeLeerling,
                  evaluatieId: content[`commentKey${n}`],
                  value: $event.target.value
                })
              "
              v-html="
                leerlingen[activeLeerling].punten[content[`commentKey${n}`]]
              "
            ></score-comments>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import ZillHeader from "@/components/ZillHeader.vue";
import ScoreTitle from "@/components/ScoreTitle.vue";
import ColorLine from "@/components/ColorLine.vue";
import ScoreComments from "@/components/ScoreComments.vue";

export default {
  name: "ScoreBlock",
  components: {
    ScoreTitle,
    ColorLine,
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
