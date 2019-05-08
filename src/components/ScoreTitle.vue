<template>
  <div class="titel bg-gray-400 border-b border-black flex items-center">
    <div
      class="h-full flex items-center flex-grow border-r border-black font-semibold"
    >
      <slot></slot>
    </div>
    <div
      class="h-full flex justify-center items-center kleurblok flex-none font-semibold text-center"
    >
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
  height: 0.5cm;
}

.kleurblok {
  width: 2cm;
}
</style>
