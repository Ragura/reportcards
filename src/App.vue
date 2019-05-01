<template>
  <div id="app">
    <main class="container mx-auto p-4">
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
