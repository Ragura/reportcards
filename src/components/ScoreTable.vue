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
      <tr class="h-2">
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
          class="text-center h-8"
          v-for="n of evaluatie.amount"
          :key="punt + n"
        >
          <table-color
            class="border border-gray-300"
            v-if="evaluatie.type === 'color'"
            :value="leerling.punten[punt] && leerling.punten[punt][n - 1]"
            @change="updateColorArray(n - 1, leerling.id, punt, $event)"
          />
          <table-select
            class="border border-gray-300"
            v-if="evaluatie.type === 'level'"
            :value="leerling.punten[punt] && leerling.punten[punt][n - 1]"
            :options="evaluatie.levels"
            @change="updateLevelsArray(n - 1, leerling.id, punt, $event)"
          />
          <p
            class="point border border-gray-300"
            v-else-if="evaluatie.type === 'points'"
            :data-previous="
              leerling.punten[punt] ? leerling.punten[punt][n - 1] : ''
            "
            contenteditable
            @blur="updatePoints(leerling.id, $event.target, n - 1)"
            v-html="
              leerling.punten[punt]
                ? formatDecimal(leerling.punten[punt][n - 1])
                : ''
            "
          ></p>
        </td>
        <!-- Gemiddelde per leerling -->
        <td class="h-8 text-center">
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
            {{ formatDecimal(average(leerling.punten[punt])) }}
          </p>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="border-t border-black" v-if="evaluatie.type === 'points'">
        <th class="text-left">Maxima</th>
        <td
          class="text-center h-10 border-t border-black"
          v-for="n of evaluatie.amount"
          :key="`${punt}-${n}-max`"
          :data-previous="
            evaluatie.maximums[n - 1] ? evaluatie.maximums[n - 1] : ''
          "
          contenteditable
          @blur="updateMaximums($event.target, n - 1)"
          v-html="evaluatie.maximums[n - 1] ? evaluatie.maximums[n - 1] : ''"
        ></td>
        <td></td>
      </tr>
      <tr class="border-t border-black" v-if="evaluatie.type === 'points'">
        <th class="text-left">Klasgemiddelde</th>
        <td
          class="text-center h-10 border-t border-black"
          v-for="n of evaluatie.amount"
          :key="`${punt}-${n}-avg`"
        >
          {{ formatDecimal(classAverage(n - 1)) }}
        </td>
        <td class="text-center">{{ formatDecimal(totalAverage()) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TableColor from "@/components/TableColor.vue";
import TableSelect from "@/components/TableSelect.vue";

export default {
  name: "ScoreTable",
  components: {
    TableColor,
    TableSelect
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
    ...mapActions([
      "updatePunten",
      "updatePuntenArray",
      "updateMaximums",
      "updateMaximumsArray"
    ]),
    formatDecimal(value) {
      if (value === null) return value;
      return value.toLocaleString(undefined, { useGrouping: false });
    },
    average(arrayPunten) {
      if (!arrayPunten || typeof arrayPunten !== "object") return "";

      let filled = 0;
      const total = arrayPunten.reduce((total, punt, index) => {
        if (punt !== null) {
          filled++;
          return (
            total + punt * (10 / this.evaluaties[this.punt].maximums[index])
          );
        }
        return total;
      }, 0);

      if (!filled) return "";
      return parseFloat((total / filled).toFixed(1));
    },
    classAverage(index) {
      let filled = 0;

      const totaal = Object.values(this.leerlingen).reduce(
        (total, leerling) => {
          if (
            leerling.punten[this.punt] &&
            typeof leerling.punten[this.punt][index] === "number"
          ) {
            filled++;
            return total + +leerling.punten[this.punt][index];
          }
          return total;
        },
        0
      );

      if (!filled) return "";

      return parseFloat((totaal / filled).toFixed(1));
    },
    totalAverage() {
      if (!Object.keys(this.leerlingen)) return "";

      let total = 0;
      let filled = 0;

      const leerlingenArray = Object.values(this.leerlingen);
      for (let i = 0; i < leerlingenArray.length; i++) {
        const average = this.average(leerlingenArray[i].punten[this.punt]);
        if (typeof average === "number") {
          filled++;
          total += average;
        }
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
      let value = eventTarget.innerText;

      value = value.replace(",", ".");

      if (isNaN(value)) {
        eventTarget.innerHTML = eventTarget.dataset.previous
          ? eventTarget.dataset.previous
          : null;
        return;
      }

      if (+value > this.evaluaties[this.punt].maximums[index]) {
        value = this.evaluaties[this.punt].maximums[index];
      }

      if (!this.leerlingen[leerlingId].punten[this.punt]) {
        const punten = Array(this.evaluaties[this.punt].amount).fill(null);
        punten[index] = value !== "" ? +value : null;
        this.updatePunten({
          leerlingId,
          evaluatieId: this.punt,
          value: punten
        });
      } else {
        this.updatePuntenArray({
          leerlingId,
          evaluatieId: this.punt,
          index,
          value: value !== "" ? +value : null
        });
      }
    },
    updateMaximums(eventTarget, index) {
      if (isNaN(eventTarget.innerText)) {
        eventTarget.innerHTML = eventTarget.dataset.previous;
        return;
      }

      if (typeof this.evaluaties[this.punt].maximums !== "object") {
        const maxima = Array(this.evaluaties[this.punt].amount).fill(null);
        maxima[index] = +eventTarget.innerText;
        this.updateMaximums({
          evaluatieId: this.punt,
          value: maxima
        });
      } else {
        this.updateMaximumsArray({
          evaluatieId: this.punt,
          index,
          value: eventTarget.innerText !== "" ? +eventTarget.innerText : null
        });
      }
    },
    updateLevelsArray(index, leerlingId, evaluatieId, value) {
      if (!this.leerlingen[leerlingId].punten[this.punt]) {
        const punten = Array(this.evaluaties[this.punt].amount).fill("");
        punten[index] = value;
        this.updatePunten({
          leerlingId,
          evaluatieId: this.punt,
          value: punten
        });
      } else {
        this.updatePuntenArray({
          leerlingId,
          evaluatieId,
          index,
          value
        });
      }
    }
  },
  created() {}
};
</script>

<style>
.vertical {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
