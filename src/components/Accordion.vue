<template>
  <div class="border border-gray-500 mb-2 flex flex-col justify-center">
    <div
      @click="open = !open"
      :class="titleclass"
      class="flex p-2 items-center justify-between cursor-pointer"
    >
      <div class="uppercase font-bold select-none">
        <slot name="title"></slot>
      </div>
      <i
        v-if="!open"
        class="material-icons mr-2 cursor-pointer text-gray-700 select-none"
        >keyboard_arrow_down</i
      >
      <i
        v-if="open"
        class="material-icons mr-2 cursor-pointer text-gray-700 select-none"
        >keyboard_arrow_up</i
      >
    </div>
    <div class="p-2" v-show="open">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  props: {
    titleclass: {
      type: String,
      default: "bg-blue-400 text-white"
    }
  }
};
</script>

<style></style>
