<template>
  <div class="lijn border-b border-black flex items-center">
    <div
      class="tekst flex h-full flex-grow border-r border-black items-center text-sm"
    >
      <slot></slot>
    </div>
    <div class="kleurblok flex-none text-center"></div>
  </div>
</template>

<script>
export default {
  name: "ScoreLine",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.lijn {
  height: 1.3cm;
}

.tekst {
  padding-left: 0.2cm;
}

.kleurblok {
  width: 2cm;
}
</style>
