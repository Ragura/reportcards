<template>
  <nav class="bg-blue-400 border-r-2 border-blue-200">
    <ul class="text-white text-xl">
      <li
        @click="$router.push('/')"
        class="px-8 mb-5 flex items-center cursor-pointer hover:text-blue-800"
      >
        <i class="material-icons mr-2">home</i>Home
      </li>
      <div v-show="activeRapport.klas">
        <li class="px-8 pt-2 pb-5 italic flex items-center bg-blue-600">
          {{ activeRapport && activeRapport.leerjaar
          }}{{ activeRapport && activeRapport.klas }}
          {{ activeRapport && activeRapport.schooljaar }}-{{
            (activeRapport && activeRapport.schooljaar) + 1
          }}
        </li>
        <li
          @click="$router.push('rapport')"
          class="pl-10 pb-5 flex items-center cursor-pointer hover:text-blue-800 bg-blue-600"
        >
          <i class="material-icons mr-2">people</i>Rapport
        </li>
        <li
          @click="$router.push('leerlingen')"
          class="pl-10 pb-2 pb-5 flex items-center cursor-pointer hover:text-blue-800 bg-blue-600"
        >
          <i class="material-icons mr-2">people</i>Leerlingen
        </li>
        <li
          @click="$router.push('punten')"
          class="pl-10 pb-2 mb-5 flex items-center cursor-pointer hover:text-blue-800 bg-blue-600"
        >
          <i class="material-icons mr-2">people</i>Punten
        </li>
      </div>
      <li
        @click="showModal('ModalSettings')"
        class="px-8 mb-5 flex items-center cursor-pointer hover:text-blue-800"
      >
        <i class="material-icons mr-2">settings</i>Instellingen
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["activeRapport"])
  },
  methods: {
    ...mapMutations(["showModal"])
  }
};
</script>

<style></style>
