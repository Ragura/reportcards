<template>
  <div
    @mouseover="displayColors = true"
    @mouseleave="displayColors = false"
    class="h-full w-full relative"
    :style="{ backgroundColor: colors[value] }"
  >
    <div
      v-show="displayColors"
      class="w-full h-full absolute cursor-pointer bottom-0 z-50"
    >
      <div
        @click="$emit('change', index)"
        class="w-full h-full"
        v-for="(color, index) of colors"
        :key="color"
        :style="{ backgroundColor: color }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      colors: ["white", "red", "yellow", "lightgreen", "lightblue"],
      displayColors: false
    };
  }
};
</script>

<style></style>
