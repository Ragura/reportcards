<template>
  <div class="lijn border-b border-black flex items-center">
    <div
      class="tekst flex h-full flex-grow border-r border-black items-center text-sm leading-tight"
    >
      {{ id ? evaluaties[id].text : "- - -" }}
    </div>
    <div class="pointsblok flex-none h-full">
      <div v-if="note" class="flex h-full items-center justify-center">
        <i class="material-icons mr-2">arrow_forward</i>
      </div>
      <div
        class="flex h-full items-center justify-center"
        v-else-if="id && !note"
      >
        <p v-if="evaluaties[id].type === 'points'">
          {{ formatDecimal(average) }}
        </p>
        <p v-if="evaluaties[id].type === 'level'">
          {{ leerlingen[activeLeerling].punten[id] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ScoreLine",
  props: {
    id: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["activeLeerling", "leerlingen", "evaluaties"]),
    average() {
      if (this.evaluaties[this.id].type !== "points") return "";
      const arrayPunten = this.leerlingen[this.activeLeerling].punten[this.id];
      if (!arrayPunten || typeof arrayPunten !== "object") return "";

      let max = 0;
      const total = arrayPunten.reduce((total, punt, index) => {
        if (punt !== null) {
          max += this.evaluaties[this.id].maximums[index];
          return total + punt;
        }
        return total;
      }, 0);

      if (!max) return "";
      return parseFloat((total / (max / 10)).toFixed(1));
    }
  },
  methods: {
    formatDecimal(value) {
      if (value === null) return value;
      return value.toLocaleString(undefined, { useGrouping: false });
    }
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

.pointsblok {
  width: 2cm;
}
</style>
