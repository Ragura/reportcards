<template>
  <table class="w-full border-collapse">
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
      <tr class="h-3">
        <!-- SPACER ROW -->
      </tr>
      <tr
        class=""
        v-for="leerling of Object.values(leerlingen)"
        :key="`${leerling.id}-${punt}`"
      >
        <!-- Leerling naam -->
        <td class="">{{ leerling.voornaam }} {{ leerling.familienaam }}</td>
        <!-- Score -->
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
          <p
            v-else-if="evaluatie.type === 'points'"
            :data-previous="
              leerling.punten[punt] ? leerling.punten[punt][n - 1] : ''
            "
            contenteditable
            @blur="updatePoints(leerling.id, $event.target, n - 1)"
            v-html="leerling.punten[punt] ? leerling.punten[punt][n - 1] : ''"
          ></p>
        </td>
        <!-- Gemiddelde -->
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
    <tfoot>
      <tr class="border-t border-black" v-if="evaluatie.type !== 'color'">
        <th class="text-left">Maxima</th>
        <td
          class="text-center h-10 border-t border-black"
          v-for="n of evaluatie.amount"
          :key="`${punt}-${n}-max`"
        >
          {{ evaluatie.maximums[n - 1] }}
        </td>
        <td></td>
      </tr>
      <tr class="border-t border-black" v-if="evaluatie.type !== 'color'">
        <th class="text-left">Klasgemiddelde</th>
        <td
          class="text-center h-10 border-t border-black"
          v-for="n of evaluatie.amount"
          :key="`${punt}-${n}-avg`"
        >
          {{ classAverage(n - 1) | hideZero }}
        </td>
        <td class="text-center">{{ totalAverage() }}</td>
      </tr>
    </tfoot>
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
  filters: {
    hideZero(value) {
      return value === 0 ? "" : value;
    }
  },
  computed: {
    ...mapState(["leerlingen", "evaluaties"]),
    evaluatie() {
      return this.evaluaties[this.punt];
    }
  },
  methods: {
    ...mapActions(["updatePunten", "updatePuntenArray"]),
    average(arrayPunten) {
      if (!arrayPunten) return "";

      let filled = 0;
      const punten = arrayPunten.map((punt, index) => {
        if (punt) filled++;
        return punt * (10 / this.evaluaties[this.punt].maximums[index]);
      });

      const total = punten.reduce((total, value) => {
        return total + value;
      }, 0);

      if (!filled) return "";
      return parseFloat((total / filled).toFixed(1));
    },
    classAverage(index) {
      const totaal = Object.values(this.leerlingen).reduce(
        (total, leerling) => {
          if (
            leerling.punten[this.punt] &&
            leerling.punten[this.punt][index] >= 0
          ) {
            return total + leerling.punten[this.punt][index];
          }
          return total;
        },
        0
      );
      return parseFloat(
        (totaal * (10 / this.evaluaties[this.punt].maximums[index])).toFixed(1)
      );
    },
    totalAverage() {
      if (!this.leerlingen) return "";

      let total = 0;
      let filled = 0;

      for (let i = 0; i < this.evaluaties[this.punt].amount; i++) {
        const average = this.classAverage(i);
        if (average) filled++;
        total += this.classAverage(i);
      }
      if (!filled) return "";

      return parseFloat((total / filled).toFixed(1));
    },
    updateColorArray(index, leerlingId, evaluatieId, value) {
      const punten = this.leerlingen[leerlingId].punten[evaluatieId];
      let arrayColors;
      if (punten) {
        arrayColors = [...punten];
      } else {
        arrayColors = Array(this.evaluaties[this.punt].amount).fill(0);
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
    },
    updatePoints(leerlingId, eventTarget, index) {
      if (isNaN(eventTarget.innerText)) {
        eventTarget.innerHTML = eventTarget.dataset.previous;
        return;
      }

      if (!this.leerlingen[leerlingId].punten[this.punt]) {
        const punten = Array(this.evaluaties[this.punt].amount).fill("");
        punten[index] = +eventTarget.innerText;
        this.updatePunten({
          leerlingId,
          evaluatieId: this.punt,
          value: punten
        });
      }
      this.updatePuntenArray({
        leerlingId,
        evaluatieId: this.punt,
        index,
        value: +eventTarget.innerText
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
</style>
