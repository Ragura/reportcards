<template>
  <div class="p-4">
    <div
      class="text-2xl bg-blue-200 flex items-center justify-center uppercase p-4 tracking-wide"
    >
      Instellingen
    </div>
    <div>
      <div class="flex justify-between item-center p-6">
        <label class="w-1/2" for="locatie">Standaardlocatie:</label>
        <button
          @click="chooseDirectory"
          class="w-1/2 rounded bg-blue-400 text-white font-semibold p-1"
        >
          Kiezen
        </button>
      </div>
      <div class="text-center bg-gray-200">
        Marges A4 pagina:
      </div>
      <div class="flex flex-wrap py-2 px-6 item-center">
        <div class="w-1/2 pr-2">
          <label class="text-sm text-gray-700 block  mb-1" for="marge-boven"
            >Boven</label
          >
          <input
            type="text"
            class="block w-full border-b outline-none mb-2"
            id="marge-boven"
            v-model="settings.marginTop"
          />
        </div>
        <div class="w-1/2 pl-2">
          <label class="text-sm text-gray-700 block  mb-1" for="marge-onder"
            >Onder</label
          >
          <input
            type="text"
            class="block w-full border-b outline-none mb-2"
            id="marge-onder"
            v-model="settings.marginBottom"
          />
        </div>
        <div class="w-1/2 pr-2">
          <label class="text-sm text-gray-700 block  mb-1" for="marge-links"
            >Links</label
          >
          <input
            type="text"
            class="block w-full border-b outline-none"
            id="marge-links"
            v-model="settings.marginLeft"
          />
        </div>
        <div class="w-1/2 pl-2">
          <label class="text-sm text-gray-700 block  mb-1" for="marge-rechts"
            >Rechts</label
          >
          <input
            type="text"
            class="block w-full border-b outline-none"
            id="marge-rechts"
            v-model="settings.marginRight"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-4">
      <button
        @click="hideModal"
        class="w-1/3 rounded border border-gray-400 font-semibold p-2 mr-4"
      >
        Annuleren
      </button>
      <button
        @click="saveSettings"
        class="w-1/3 rounded bg-blue-400 text-white font-semibold p-2"
      >
        Opslaan
      </button>
    </div>
  </div>
</template>

<script>
const { dialog } = require("electron").remote;
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: `ModalSettings`,
  data() {
    return {
      settings: {
        standardLocation: "",
        marginTop: 1.7,
        marginBottom: 1.7,
        marginLeft: 2,
        marginRight: 2
      }
    };
  },
  computed: {
    ...mapState({ globalSettings: "settings" })
  },
  methods: {
    ...mapMutations([`hideModal`]),
    ...mapActions(["writeSettings"]),
    chooseDirectory() {
      const dir = dialog.showOpenDialog({
        title: "Kies map voor rapporten",
        defaultPath:
          this.settings.standardLocation ||
          this.globalSettings.standardLocation,
        properties: ["openDirectory"],
        message: "Kies een map waar rapporten worden opgeslagen"
      });

      if (dir) {
        this.$set(this.settings, "standardLocation", dir[0]);
      }
    },
    saveSettings() {
      this.writeSettings(this.settings);
      this.hideModal();
    }
  },
  created() {
    this.settings = { ...this.globalSettings };
  }
};
</script>

<style lang="scss" scoped></style>
