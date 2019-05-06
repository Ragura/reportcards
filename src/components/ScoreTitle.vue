<template>
  <div class="bg-gray-400 border-b border-black flex items-center">
    <div class="titel flex-grow border-r border-black font-semibold">
      <slot></slot>
    </div>
    <div class="kleurblok flex-none uppercase font-semibold text-center">
      Beeld
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.titel {
  padding-left: 0.2cm;
}

.kleurblok {
  width: 2cm;
}
</style>
