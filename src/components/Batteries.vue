<template>
  <div class="batteries w-full border border-black flex">
    <!-- Left column -->
    <div
      class="flex flex-wrap w-1/2 border-r border-black flex justify-around items-center"
    >
      <h2 class="w-full font-bold">{{ content.left.text }}</h2>
      <div class="battery" v-for="n of 4" :key="`battery-left-${n}`">
        <BatteryCircle
          v-show="activeLeerling.punten[content.left.valueKey] === n"
          class="circle"
        />
        <img
          @click="
            updatePuntenLeerling({
              leerlingId: activeLeerlingId,
              key: content.left.valueKey,
              value: n
            })
          "
          class="mx-auto"
          :src="`/images/battery${n}.png`"
        />
      </div>
    </div>
    <!-- Right column -->
    <div class="flex flex-wrap w-1/2 flex justify-around items-center">
      <h2 class="w-full font-bold">{{ content.right.text }}</h2>
      <div class="battery" v-for="n of 4" :key="`battery-right-${n}`">
        <BatteryCircle
          v-show="activeLeerling.punten[content.right.valueKey] === n"
          class="circle"
        />
        <img
          @click="
            updatePuntenLeerling({
              leerlingId: activeLeerlingId,
              key: content.right.valueKey,
              value: n
            })
          "
          class="mx-auto"
          :src="`/images/battery${n}.png`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BatteryCircle from "@/components/BatteryCircle.vue";

export default {
  components: {
    BatteryCircle
  },
  props: {
    content: {
      type: Object
    }
  },
  computed: {
    ...mapState(["activeRapport", "activeLeerlingId"]),
    ...mapGetters(["activeLeerling"])
  },
  methods: {
    ...mapActions(["updatePuntenLeerling"])
  }
};
</script>

<style lang="scss" scoped>
.batteries {
  height: 3.5cm;

  h2 {
    padding: 0.1cm 0.2cm;
    margin-bottom: 0.2cm;
  }

  .battery {
    position: relative;
    padding-bottom: 0.2cm;

    .circle {
      position: absolute;
      transform: translateY(-0.2cm) translateX(-25%);
    }

    img {
      height: 1.5cm;
    }
  }
}
</style>
