<template>
  <div class="batteries flex justify-around items-center p-2">
    <div class="battery">
      <BatteryCircle v-show="battery === 1" class="circle" />
      <img
        @click="$emit('select', 1)"
        class="mx-auto"
        src="@/assets/images/battery1.png"
        alt="Lege batterij"
      />
    </div>
    <div class="battery">
      <BatteryCircle v-show="battery === 2" class="circle" />
      <img
        @click="$emit('select', 2)"
        class="mx-auto"
        src="@/assets/images/battery2.png"
        alt="Kwart batterij"
      />
    </div>
    <div class="battery">
      <BatteryCircle v-show="battery === 3" class="circle" />
      <img
        @click="$emit('select', 3)"
        class="batterij mx-auto"
        src="@/assets/images/battery3.png"
        alt="Drie-kwart batterij"
      />
    </div>
    <div class="battery">
      <BatteryCircle v-show="battery === 4" class="circle" />
      <img
        @click="$emit('select', 4)"
        class="mx-auto"
        src="@/assets/images/battery4.png"
        alt="Volle batterij"
      />
    </div>
  </div>
</template>

<script>
import BatteryCircle from "@/components/BatteryCircle.vue";

export default {
  components: {
    BatteryCircle
  },
  props: {
    battery: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
.battery {
  position: relative;

  .circle {
    position: absolute;
    transform: translateY(-0.2cm) translateX(-25%);
  }

  img {
    height: 1.5cm;
  }
}
</style>
