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
        v-for="(leerling, leerlingIndex) of Object.values(leerlingen)"
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
          <!-- <table-select
            class="border border-gray-300"
            v-if="evaluatie.type === 'level'"
            :value="leerling.punten[punt] && leerling.punten[punt][n - 1]"
            :options="evaluatie.levels"
            @change="updateLevelsArray(n - 1, leerling.id, punt, $event)"
          /> -->
          <p
            class="point border border-gray-300"
            :ref="`${punt}-${leerlingIndex}-${n}`"
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
            @keydown.enter.prevent="nextPoint(leerlingIndex, n)"
            @keydown.down.prevent="nextPoint(leerlingIndex, n)"
            @keydown.up.prevent="previousPoint(leerlingIndex, n)"
            @keydown.right="nextEval(leerlingIndex, n, $event)"
            @keydown.left="previousEval(leerlingIndex, n, $event)"
            @keydown.space.prevent
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
          <table-select
            class="border border-gray-300"
            v-else-if="evaluatie.type === 'level'"
            :value="leerling.punten[punt] ? leerling.punten[punt] : ''"
            :options="evaluatie.levels"
            @change="updateLevelValue(leerling.id, $event)"
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
    nextPoint(leerlingIndex, index) {
      if (leerlingIndex < Object.keys(this.leerlingen).length - 1) {
        this.$refs[`${this.punt}-${leerlingIndex + 1}-${index}`][0].focus();
      }
    },
    previousPoint(leerlingIndex, index) {
      if (leerlingIndex > 0) {
        this.$refs[`${this.punt}-${leerlingIndex - 1}-${index}`][0].focus();
      }
    },
    getCaretPosition() {
      if (window.getSelection && window.getSelection().getRangeAt) {
        var range = window.getSelection().getRangeAt(0);
        var selectedObj = window.getSelection();
        var rangeCount = 0;
        var childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
          if (childNodes[i] == selectedObj.anchorNode) {
            break;
          }
          if (childNodes[i].outerHTML)
            rangeCount += childNodes[i].outerHTML.length;
          else if (childNodes[i].nodeType == 3) {
            rangeCount += childNodes[i].textContent.length;
          }
        }
        return range.startOffset + rangeCount;
      }
      return -1;
    },
    nextEval(leerlingIndex, index, event) {
      if (
        index + 1 <= this.evaluatie.amount &&
        this.getCaretPosition() ==
          this.$refs[`${this.punt}-${leerlingIndex}-${index}`][0].innerHTML
            .length
      ) {
        index++;
        const target = this.$refs[`${this.punt}-${leerlingIndex}-${index}`][0];
        target.focus();
        event.preventDefault();
      }
    },
    previousEval(leerlingIndex, index, event) {
      if (index - 1 > 0 && this.getCaretPosition() == 0) {
        index--;
        const target = this.$refs[`${this.punt}-${leerlingIndex}-${index}`][0];
        target.focus();
        event.preventDefault();
      }
    },
    // Average with weighting depening on max score amount
    average(arrayPunten) {
      if (!arrayPunten || typeof arrayPunten !== "object") return "";

      let max = 0;
      const total = arrayPunten.reduce((total, punt, index) => {
        if (punt !== null) {
          max += this.evaluaties[this.punt].maximums[index];
          return total + punt;
        }
        return total;
      }, 0);

      if (!max) return "";
      return parseFloat((total / (max / 10)).toFixed(1));
    },
    // Average without weighting
    // average(arrayPunten) {
    //   if (!arrayPunten || typeof arrayPunten !== "object") return "";

    //   let filled = 0;
    //   const total = arrayPunten.reduce((total, punt, index) => {
    //     if (punt !== null) {
    //       filled++;
    //       return (
    //         total + punt * (10 / this.evaluaties[this.punt].maximums[index])
    //       );
    //     }
    //     return total;
    //   }, 0);

    //   if (!filled) return "";
    //   return parseFloat((total / filled).toFixed(1));
    // },
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
    // updateLevelsArray(index, leerlingId, evaluatieId, value) {
    //   if (!this.leerlingen[leerlingId].punten[this.punt]) {
    //     const punten = Array(this.evaluaties[this.punt].amount).fill("");
    //     punten[index] = value;
    //     this.updatePunten({
    //       leerlingId,
    //       evaluatieId: this.punt,
    //       value: punten
    //     });
    //   } else {
    //     this.updatePuntenArray({
    //       leerlingId,
    //       evaluatieId,
    //       index,
    //       value
    //     });
    //   }
    // },
    updateLevelValue(leerlingId, value) {
      this.updatePunten({
        leerlingId,
        evaluatieId: this.punt,
        value
      });
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
