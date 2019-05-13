<template>
  <table class="w-full">
    <thead>
      <tr>
        <th class="text-left">Leerling</th>
        <th class="text-center" v-for="n of evaluatie.amount" :key="punt + n">
          <div class="w-full flex items-center vertical leading-none">
            Toets {{ n }}
          </div>
        </th>
        <th>Gemiddelde</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="leerling of Object.values(leerlingen)"
        :key="`${leerling.id}-${punt}`"
      >
        <td>{{ leerling.voornaam }} {{ leerling.familienaam }}</td>
        <td class="text-center" v-for="n of evaluatie.amount" :key="punt + n">
          {{ leerling.punten[punt][n - 1] }}
        </td>
        <td>
          {{
            evaluatie.type === "color"
              ? leerling.punten[`${punt}-final`]
              : gemiddelde(leerling.punten[punt])
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ScoreTable",
  props: {
    punt: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["leerlingen", "evaluaties"]),
    evaluatie() {
      return this.evaluaties[this.punt];
    }
  },
  methods: {
    ...mapActions(["updatePunten"])
  }
};
</script>

<style>
.vertical {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
