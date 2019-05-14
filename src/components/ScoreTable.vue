<template>
  <table class="w-full border-separate">
    <thead>
      <tr class="border-b border-gray-600">
        <th class="text-left">Leerling</th>
        <th class="pb-2" v-for="n of evaluatie.amount" :key="punt + n">
          <div class="mx-auto vertical leading-none">Eval. {{ n }}</div>
        </th>
        <th>Gemiddelde</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class=""
        v-for="leerling of Object.values(leerlingen)"
        :key="`${leerling.id}-${punt}`"
      >
        <td class="">{{ leerling.voornaam }} {{ leerling.familienaam }}</td>
        <td
          class="text-center h-10"
          v-for="n of evaluatie.amount"
          :key="punt + n"
        >
          <table-color
            v-if="evaluatie.type === 'color'"
            :value="leerling.punten[punt] && leerling.punten[punt][n - 1]"
            @change="updateColorArray(n - 1, leerling.id, punt, $event)"
          />
          <p v-else-if="evaluatie.type === 'points'">
            {{ leerling.punten[punt] ? leerling.punten[punt][n - 1] : "" }}
          </p>
        </td>
        <td class="h-10 text-center">
          <table-color
            v-if="evaluatie.type === 'color'"
            :value="
              leerling.punten[`${punt}-final`]
                ? leerling.punten[`${punt}-final`]
                : 0
            "
            @change="updateColorValue(leerling.id, `${punt}-final`, $event)"
          />
          <p v-else-if="evaluatie.type === 'points'">
            {{ average(leerling.punten[punt]) }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TableColor from "@/components/TableColor.vue";
export default {
  name: "ScoreTable",
  components: {
    TableColor
  },
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
    ...mapActions(["updatePunten"]),
    average(arrayPunten) {
      const punten = arrayPunten.map((punt, index) => {
        return punt * (10 / this.evaluaties[this.punt].maximums[index]);
      });
      const total = punten.reduce((total, value) => {
        return (total += value);
      }, 0);
      return (total / punten.length).toFixed(1);
    },
    updateColorArray(index, leerlingId, evaluatieId, value) {
      const punten = this.leerlingen[leerlingId].punten[evaluatieId];
      let arrayColors;
      if (punten) {
        arrayColors = [...punten];
      } else {
        arrayColors = Array(this.evaluaties[this.punt].amount);
      }

      arrayColors[index] = value;
      this.updatePunten({
        leerlingId,
        evaluatieId,
        value: arrayColors
      });
    },
    updateColorValue(leerlingId, evaluatieId, value) {
      this.updatePunten({
        leerlingId,
        evaluatieId,
        value
      });
    }
  }
};
</script>

<style>
.vertical {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

table {
  border-spacing: 0.5rem;
}
</style>
