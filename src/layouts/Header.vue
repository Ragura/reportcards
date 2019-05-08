<template>
  <header class="flex justify-between items-center text-gray-700">
    <div class="header-block uppercase">{{ seizoen }}rapport</div>
    <div class="header-block">
      {{ activeLeerling.voornaam }} {{ activeLeerling.familienaam }}
    </div>
    <div class="header-block">
      Klas {{ activeRapport.leerjaar }}{{ activeRapport.klas }}
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["activeRapport"]),
    ...mapGetters(["activeLeerling"]),
    seizoen() {
      switch (this.activeRapport.periode) {
        case 1:
          return "Herfst";
        case 2:
          return "Winter";
        case 3:
          return "Lente";
        case 4:
          return "Zomer";
      }
      return "Herfst";
    }
  }
};
</script>

<style lang="scss">
header {
  height: 0.5cm;
  padding: 0;
}
</style>
