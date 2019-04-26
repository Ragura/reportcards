<template>
  <div class="bg-gray-400 border flex items-center">
    <div class="titel w-4/5 border-r font-semibold">
      {{ text }}
    </div>
    <div class="w-1/5 uppercase font-semibold text-center">Beeld</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.titel {
  padding-left: 0.2cm;
}
</style>
