<template>
  <div class="lijn border-b border-black flex items-center">
    <div
      class="tekst flex h-full flex-grow border-r border-black items-center text-sm"
    >
      {{ id ? evaluaties[id].text : "---" }}
    </div>
    <div class="kleurblok flex-none h-full">
      <score-color
        v-show="id"
        :value="leerlingen[activeLeerling].punten[colorKey]"
        @change="
          updatePunten({
            leerlingId: activeLeerling,
            evaluatieId: colorKey,
            value: $event
          })
        "
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ScoreColor from "@/components/ScoreColor.vue";

export default {
  name: "ColorLine",
  components: {
    ScoreColor
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["activeLeerling", "leerlingen", "evaluaties"]),
    colorKey() {
      return this.id && this.evaluaties[this.id].amount === 1
        ? this.id
        : `${this.id}-final`;
    }
  },
  methods: {
    ...mapActions(["updatePunten"])
  },
  created() {}
};
</script>

<style scoped>
.lijn {
  height: 1cm;
}

.tekst {
  padding-left: 0.2cm;
  padding-right: 0.2cm;
}

.kleurblok {
  width: 2cm;
}
</style>
