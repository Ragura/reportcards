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
      <!-- <div class="text-center bg-gray-200">
        Backups:
      </div>
      <div class="flex justify-between item-center py-6">
        <button
          :disabled="!online || !meta.id"
          @click="restoreBackup"
          :class="{ 'opacity-50 cursor-default': !online || !meta.id }"
          class="w-1/2 rounded bg-blue-400 text-white font-semibold p-1 mr-2"
        >
          Backup terugzetten
        </button>
        <button
          :disabled="!online"
          @click="createBackup"
          :class="{ 'opacity-50 cursor-default': !online }"
          class="w-1/2 rounded bg-blue-400 text-white font-semibold p-1"
        >
          Backup maken
        </button>
      </div> -->
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
            v-model="huidigeSettings.marginTop"
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
            v-model="huidigeSettings.marginBottom"
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
            v-model="huidigeSettings.marginLeft"
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
            v-model="huidigeSettings.marginRight"
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
import axios from "axios";

export default {
  name: `ModalSettings`,
  data() {
    return {
      huidigeSettings: {
        standardLocation: "",
        marginTop: 1.7,
        marginBottom: 1.7,
        marginLeft: 2,
        marginRight: 2
      }
    };
  },
  computed: {
    ...mapState([
      "settings",
      "online",
      "meta",
      "leerlingen",
      "evaluaties",
      "blocks"
    ]),
    isOnline() {
      return navigator.onLine;
    }
  },
  methods: {
    ...mapMutations([`hideModal`]),
    ...mapActions(["writeSettings", "generateRapportId"]),
    chooseDirectory() {
      console.log(this.globalSettings);

      const dir = dialog.showOpenDialog({
        title: "Kies map voor rapporten",
        defaultPath: this.settings.standardLocation,
        properties: ["openDirectory"],
        message: "Kies een map waar rapporten worden opgeslagen"
      });

      if (dir) {
        this.$set(this.huidigeSettings, "standardLocation", dir[0]);
      }
    },
    saveSettings() {
      this.writeSettings(this.huidigeSettings);
      this.hideModal();
    },
    async createBackup() {
      if (!this.meta.id) {
        this.generateRapportId();
      }
      try {
        await axios.post("http://localhost:7000", {
          meta: this.meta,
          leerlingen: this.leerlingen,
          evaluaties: this.evaluaties,
          blocks: this.blocks
        });
        this.$toasted.show("Backup gelukt!", {
          position: "bottom-center",
          duration: 2000
        });
      } catch (err) {
        this.$toasted.show("Backup mislukt!", {
          position: "bottom-center",
          duration: 2000
        });
      }
    },
    async restoreBackup() {
      const { data } = await axios.get(`http://localhost:7000?id=123`);
      console.log(data);
    }
  },
  created() {
    console.log(this.settings);

    this.huidigeSettings = { ...this.settings };
  }
};
</script>

<style lang="scss" scoped></style>
