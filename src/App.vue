<template>
  <div id="app">
    <main>
      <router-view />
    </main>
    <app-modal />
  </div>
</template>

<script>
import AppModal from "@/components/AppModal.vue";

export default {
  components: {
    AppModal
  }
};
</script>

<style lang="scss"></style>
