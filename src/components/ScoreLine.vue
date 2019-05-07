<template>
  <div class="lijn border-b border-black flex items-center">
    <div
      class="tekst flex h-full flex-grow border-r border-black items-center text-sm"
    >
      {{ line.text }}
    </div>
    <div class="kleurblok flex-none h-full">
      <score-color
        v-show="line.valueKey"
        :value="activeLeerling.punten[line.valueKey]"
        @change="
          updatePuntenLeerling({
            leerlingId: activeLeerlingId,
            key: line.valueKey,
            value: $event
          })
        "
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ScoreColor from "@/components/ScoreColor.vue";

export default {
  name: "ScoreLine",
  components: {
    ScoreColor
  },
  props: {
    line: {
      type: Object
    }
  },
  computed: {
    ...mapState(["activeLeerlingId"]),
    ...mapGetters(["activeLeerling"])
  },
  methods: {
    ...mapActions(["updatePuntenLeerling"])
  },
  created() {}
};
</script>

<style scoped>
.lijn {
  height: 1.3cm;
}

.tekst {
  padding-left: 0.2cm;
}

.kleurblok {
  width: 2cm;
}
</style>
