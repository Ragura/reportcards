<template>
  <select
    :value="value"
    class="appearance-none px-2"
    @change="$emit('change', $event.target.value)"
  >
    <option :value="''">--</option>
    <option v-for="option of options" :key="option" :value="option"
      >{{ option }}&nbsp;</option
    >
  </select>
</template>

<script>
export default {
  data() {
    return {
      keuze: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  created() {}
};
</script>

<style></style>
