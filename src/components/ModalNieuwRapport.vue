<template>
  <div class="p-4">
    <div
      class="text-2xl bg-blue-200 flex items-center justify-center uppercase p-4 tracking-wide"
    >
      Nieuw Rapport
    </div>
    <div>
      <div class="flex justify-between item-center p-6">
        <label class="w-1/3" for="jaar">Jaar:</label>
        <select
          class="w-1/3 border-b flex-grow text-right"
          id="jaar"
          v-model="rapport.jaar"
        >
          <option class="text-right" selected value="1">Eerste leerjaar</option>
          <option value="2">Tweede leerjaar</option>
          <option value="3">Derde leerjaar</option>
          <option value="4">Vierde leerjaar</option>
          <option value="5">Vijfde leerjaar</option>
          <option value="6">Zesde leerjaar</option>
        </select>
      </div>
      <div class="flex justify-between item-center p-6">
        <label class="w-1/3" for="periode">Periode:</label>
        <select
          class="w-1/3 border-b flex-grow text-right"
          id="periode"
          v-model="rapport.jaar"
        >
          <option class="text-right" selected value="1">Herfst</option>
          <option value="2">Winter</option>
          <option value="3">Lente</option>
          <option value="4">Zomer</option>
        </select>
      </div>
    </div>
    <div class="flex justify-center items-center mt-2">
      <button
        @click="hideModal"
        class="w-1/3 rounded border border-gray-400 font-semibold p-2 mr-4"
      >
        Annuleren
      </button>
      <button class="w-1/3 rounded bg-blue-400 text-white font-semibold p-2">
        Maken
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: `ModalNieuwRapport`,
  data() {
    return {
      rapport: {
        jaar: 1,
        periode: 1
      }
    };
  },
  methods: {
    ...mapMutations([`hideModal`]),
    login() {
      this.hideModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
