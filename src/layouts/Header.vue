<template>
  <header class="flex justify-between items-center text-gray-700">
    <div class="header-block uppercase">{{ seizoen }}rapport</div>
    <div class="header-block">
      {{ leerlingen[activeLeerling].voornaam }}
      {{ leerlingen[activeLeerling].familienaam }}
    </div>
    <div class="header-block">Klas {{ meta.leerjaar }}{{ meta.klas }}</div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["leerlingen", "activeLeerling", "meta"]),
    seizoen() {
      switch (this.meta.periode) {
        case "1":
          return "Herfst";
        case "2":
          return "Winter";
        case "3":
          return "Lente";
        case "4":
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
