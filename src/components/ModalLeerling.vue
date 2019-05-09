<template>
  <div class="p-4">
    <h1
      class="text-2xl bg-blue-200 flex items-center justify-center uppercase p-4 tracking-wide"
    >
      {{ modalData.mode === "new" ? "Nieuwe leerling" : "Leerling wijzigen" }}
    </h1>
    <div class="flex flex-wrap py-2 px-6 item-center">
      <div class="w-1/2 pr-2">
        <label class="text-sm text-gray-700 block  mb-1" for="voornaam"
          >Voornaam</label
        >
        <input
          type="text"
          ref="input-voornaam"
          class="block w-full border-b outline-none mb-2"
          id="voornaam"
          v-model="voornaam"
        />
      </div>
      <div class="w-1/2 pl-2">
        <label class="text-sm text-gray-700 block  mb-1" for="familienaam"
          >Familienaam</label
        >
        <input
          type="text"
          class="block w-full border-b outline-none mb-2"
          id="familienaam"
          v-model="familienaam"
        />
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
        @click="
          modalData.mode === 'new' ? addNewLeerling() : editExistingLeerling()
        "
        class="w-full md:w-1/3 rounded bg-blue-400 text-white font-semibold p-2"
      >
        {{ modalData.mode === "new" ? "Toevoegen" : "Wijzigen" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      voornaam: "",
      familienaam: ""
    };
  },
  computed: {
    ...mapState(["settings", "modalData"])
  },
  methods: {
    ...mapMutations(["hideModal"]),
    ...mapActions([
      "passModalData",
      "setActiveRapport",
      "addLeerling",
      "editLeerling"
    ]),
    addNewLeerling() {
      this.addLeerling({
        voornaam: this.voornaam,
        familienaam: this.familienaam
      });
      this.hideModal();
    },
    editExistingLeerling() {
      this.editLeerling({
        leerlingId: this.modalData.leerling.id,
        voornaam: this.voornaam,
        familienaam: this.familienaam
      });
      this.hideModal();
    }
  },
  created() {
    if (this.modalData.leerling) {
      this.voornaam = this.modalData.leerling.voornaam;
      this.familienaam = this.modalData.leerling.familienaam;
    }
    this.$nextTick(() => {
      this.$refs["input-voornaam"].focus();
    });
  }
};
</script>

<style></style>
