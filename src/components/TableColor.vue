<template>
  <div
    @mouseover="displayColors = true"
    @mouseleave="displayColors = false"
    class="h-full w-full relative"
    :style="{ backgroundColor: colors[value] }"
  >
    <div v-show="displayColors" class="w-full h-full flex cursor-pointer">
      <div
        @click="$emit('change', index)"
        class="h-full w-full"
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
      colors: [
        "white",
        "red",
        "yellow",
        "rgb(146, 208, 80)",
        "rgb(0, 176, 240)"
      ],
      displayColors: false
    };
  }
};
</script>

<style></style>
