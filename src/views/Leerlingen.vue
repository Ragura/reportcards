<template>
  <div>
    <h1 class="text-2xl uppercase pb-4 border-b border-gray-200 mb-4">
      Leerlingen
    </h1>
    <div class="leerling-container sm:full max-w-4xl flex flex-col">
      <div
        class="flex sm:flex-col md:flex-row justify-between items-center -mx-2"
      >
        <button
          @click="showNieuweLeerling"
          class="flex sm:w-full md:w-auto items-center bg-gray-200 border border-gray-200 text-gray-700 mx-2 mb-4 py-3 px-4 rounded leading-tight outline-none focus:outline-none hover:bg-white hover:border-gray-500"
        >
          <i class="material-icons mr-2">person_add</i>Leerling toevoegen
        </button>
        <button
          @click="importFromRapport"
          class="flex sm:w-full md:w-auto items-center bg-gray-200 border border-gray-200 text-gray-700 mx-2 mb-4 py-3 px-4 rounded leading-tight outline-none focus:outline-none hover:bg-white hover:border-gray-500"
        >
          <i class="material-icons mr-2">school</i>Importeren uit rapport
        </button>
        <button
          @click="importFromExcel"
          class="flex sm:w-full md:w-auto items-center bg-gray-200 border border-gray-200 text-gray-700 mx-2 mb-4 py-3 px-4 rounded leading-tight outline-none focus:outline-none hover:bg-white hover:border-gray-500"
        >
          <i class="material-icons mr-2">description</i>Importeren uit excel
        </button>
      </div>
      <ul class="border border-gray-500 flex-grow">
        <li
          class="border-b border-gray-500 p-2 flex justify-between items-center"
          v-for="leerling of Object.values(leerlingen)"
          :key="`leerling-${leerling.id}`"
        >
          <p>{{ leerling.voornaam }} {{ leerling.familienaam }}</p>
          <div class="flex items-center">
            <i
              @click="showEditLeerling(leerling.id)"
              class="material-icons mr-2 cursor-pointer text-gray-700"
              >edit</i
            >
            <i
              @click="showConfirmModal(leerling.id)"
              class="material-icons mr-2 cursor-pointer text-gray-700"
              >delete</i
            >
          </div>
        </li>
      </ul>
    </div>
    <modal-confirm
      v-show="showConfirm"
      @close="showConfirm = false"
      @ok="removeLeerling"
    >
      <h1
        slot="header"
        class="text-2xl bg-blue-200 flex items-center justify-center uppercase p-4 tracking-wide"
      >
        Leerling verwijderen
      </h1>
      Bent u zeker dat u de leerling wil verwijderen? Het bijhorende rapport zal
      ook verwijderd worden.
    </modal-confirm>
  </div>
</template>

<script>
const jsonfile = require("jsonfile");
const xlsx = require("xlsx");

import uniqid from "uniqid";
const { dialog } = require("electron").remote;
import ModalConfirm from "@/components/ModalConfirm.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ModalConfirm
  },
  data() {
    return {
      showConfirm: false,
      leerlingToDelete: ""
    };
  },
  computed: {
    ...mapState(["leerlingen", "settings", "meta"])
  },
  methods: {
    ...mapMutations(["showModal"]),
    ...mapActions([
      "passModalData",
      "addLeerling",
      "addLeerlingen",
      "deleteLeerling",
      "updateLeerling"
    ]),
    showNieuweLeerling() {
      this.passModalData({ mode: "new" });
      this.showModal("ModalLeerling");
    },
    showEditLeerling(id) {
      this.passModalData({ mode: "edit", id });
      this.showModal("ModalLeerling");
    },
    showConfirmModal(id) {
      this.leerlingToDelete = id;
      this.showConfirm = true;
    },
    removeLeerling() {
      this.deleteLeerling(this.leerlingToDelete);
      this.showConfirm = false;
    },
    importFromRapport() {
      const rapportPath = dialog.showOpenDialog({
        title: "Open een rapport",
        defaultPath: this.settings.standardLocation,
        properties: ["openFile"],
        message: "Kies rapportbestand om leerlingen uit te importeren."
      });

      if (!rapportPath[0]) return;

      const rapport = jsonfile.readFileSync(rapportPath[0]);
      if (!rapport) return;

      this.addLeerlingen(rapport.leerlingen);
    },
    importFromExcel() {
      const path = dialog.showOpenDialog({
        title: "Open een Excel bestand met geëxporteerde data",
        defaultPath: this.settings.standardLocation,
        properties: ["openFile"],
        message: "Kies een Excel bestand om leerlingen uit te importeren."
      });

      if (!path[0]) return;

      const workbook = xlsx.readFile(path[0]);

      const sheetLeerlingen = xlsx.utils.sheet_to_json(
        workbook.Sheets["Sheet1"],
        {
          header: "A"
        }
      );
      const leerlingen = {};
      sheetLeerlingen.forEach(l => {
        if (l.A === this.meta.leerjaar + this.meta.klas) {
          const id = uniqid();
          leerlingen[id] = {
            id,
            voornaam: l.D,
            familienaam: l.C,
            punten: {}
          };
        }
      });

      this.addLeerlingen(leerlingen);
    }
  }
};
</script>

<style></style>
