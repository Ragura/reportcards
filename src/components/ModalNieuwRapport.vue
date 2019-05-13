<template>
  <div class="p-4">
    <div
      class="text-2xl bg-blue-200 flex items-center justify-center uppercase p-4 tracking-wide"
    >
      Nieuw Rapport
    </div>
    <div>
      <div
        class="flex flex-col md:flex-row justify-between item-center px-6 py-4"
      >
        <label class="w-1/3 mb-2 md:mb-0 font-semibold" for="schooljaar"
          >Schooljaar:</label
        >
        <select
          class="w-full md:w-1/3 border-b flex-grow text-right"
          id="schooljaar"
          v-model="rapport.schooljaar"
        >
          <option class="text-right" :value="getSchooljaar() - 1"
            >{{ getSchooljaar() - 1 }} - {{ getSchooljaar() }}</option
          >
          <option class="text-right" :value="getSchooljaar()"
            >{{ getSchooljaar() }} - {{ getSchooljaar() + 1 }}</option
          >
          <option class="text-right" :value="getSchooljaar() + 1"
            >{{ getSchooljaar() + 1 }} - {{ getSchooljaar() + 2 }}</option
          >
        </select>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between item-center p-6 py-4"
      >
        <label class="w-1/3 mb-2 md:mb-0 font-semibold" for="jaar"
          >Leerjaar:</label
        >
        <select
          class="w-full md:w-1/3 border-b flex-grow text-right"
          id="jaar"
          v-model="rapport.leerjaar"
        >
          <option class="text-right" selected value="1">Eerste</option>
          <option value="2">Tweede</option>
          <option value="3">Derde</option>
          <option value="4">Vierde</option>
          <option value="5">Vijfde</option>
          <option value="6">Zesde</option>
        </select>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between item-center p-6 py-4"
      >
        <label class="w-1/3 mb-2 md:mb-0 font-semibold" for="klas">Klas:</label>
        <select
          class="w-full md:w-1/3 border-b flex-grow text-right"
          id="klas"
          v-model="rapport.klas"
        >
          <option class="text-right" selected value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between item-center p-6 py-4"
      >
        <label class="w-1/3 mb-2 md:mb-0 font-semibold" for="periode"
          >Periode:</label
        >
        <select
          class="w-full md:w-1/3 border-b flex-grow text-right"
          id="periode"
          v-model="rapport.periode"
        >
          <option class="text-right" selected value="1">Herfst</option>
          <option value="2">Winter</option>
          <option value="3">Lente</option>
          <option value="4">Zomer</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-center items-center mt-4">
      <button
        @click="hideModal"
        class="w-full md:w-1/3 rounded border border-gray-400
               font-semibold p-2 mr-0 md:mr-4 mb-2 md:mb-0"
      >
        Annuleren
      </button>
      <button
        @click="makeRapport"
        class="w-full md:w-1/3 rounded bg-blue-400 text-white font-semibold p-2"
      >
        Maken
      </button>
    </div>
  </div>
</template>

<script>
const { cloneDeep } = require("lodash");

import uniqid from "uniqid";
import { mapState, mapMutations, mapActions } from "vuex";
import rapportTemplate from "@/data/templates.json";

export default {
  name: `ModalNieuwRapport`,
  data() {
    return {
      currentDate: new Date(),
      rapport: {
        schooljaar: "",
        leerjaar: 1,
        klas: "A",
        periode: 1
      }
    };
  },
  computed: {
    ...mapState(["settings"])
  },
  methods: {
    ...mapMutations(["hideModal"]),
    ...mapActions(["createRapport"]),
    makeRapport() {
      const path = this.settings.standardLocation;
      const schooljaar = this.getSchooljaar();
      const leerjaar = this.rapport.leerjaar;
      const klas = this.rapport.klas;
      const periode = this.rapport.periode;

      const fullPath = `${path}/${schooljaar}_${leerjaar}${klas}_${periode}.rap`;

      const rapport = {
        meta: {
          id: uniqid(),
          schooljaar,
          leerjaar,
          periode,
          klas
        },
        ...cloneDeep(rapportTemplate)
      };

      this.createRapport({
        path: fullPath,
        rapport
      });

      this.$router.push("/rapport");
      this.hideModal();
    },
    getSchooljaar() {
      if (this.currentDate.getMonth() < 6) {
        return this.currentDate.getFullYear() - 1;
      } else {
        return this.currentDate.getFullYear();
      }
    }
  },
  created() {
    this.rapport.schooljaar = this.getSchooljaar();
  }
};
</script>

<style lang="scss" scoped></style>
