<template>
  <div>
    <h1 class="text-2xl uppercase pb-4 border-b border-gray-200 mb-4">
      Leerlingen
    </h1>
    <div class="leerling-container sm:full md:w-2/3 max-w-4xl flex flex-col">
      <button
        class="self-end flex items-center bg-gray-200 border border-gray-200 text-gray-700 mb-4 py-3 px-4 rounded leading-tight outline-none focus:outline-none hover:bg-white hover:border-gray-500"
      >
        <i class="material-icons mr-2">person_add</i>Leerling toevoegen
      </button>
      <ul class="border border-gray-500 flex-grow">
        <li
          class="border-b border-gray-500 p-2 flex justify-between items-center"
          v-for="leerling of activeRapport.leerlingen"
          :key="leerling.id"
        >
          <p>{{ leerling.voornaam }} {{ leerling.familienaam }}</p>
          <div class="flex items-center">
            <i class="material-icons mr-2 cursor-pointer text-gray-700">edit</i>
            <i class="material-icons mr-2 cursor-pointer text-gray-700"
              >delete</i
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// const jsonfile = require("jsonfile");
// const { dialog } = require("electron").remote;
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["activeRapport"])
  }
};
</script>

<style></style>
