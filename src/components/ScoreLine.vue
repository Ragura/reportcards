<template>
  <div class="lijn border-b border-black flex items-center">
    <div
      class="tekst flex h-full flex-grow border-r border-black items-center text-sm"
    >
      {{ id ? evaluaties[id].text : "---" }}
    </div>
    <div class="kleurblok flex-none h-full">
      <score-color v-show="id" :value="leerlingen[activeLeerling].punten[id]" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ScoreColor from "@/components/ScoreColor.vue";

export default {
  name: "ScoreLine",
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
    ...mapState(["activeLeerling", "leerlingen", "evaluaties"])
  },
  methods: {},
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
