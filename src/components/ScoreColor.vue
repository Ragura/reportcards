<template>
  <div
    @mouseover="displayColors = true"
    @mouseleave="displayColors = false"
    class="h-full w-full relative"
    :style="{ backgroundColor: colors[value] }"
  >
    <div
      v-show="displayColors"
      class="w-full h-full flex flex-col cursor-pointer"
    >
      <div
        @click="$emit('change', index)"
        class="w-full h-16"
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
