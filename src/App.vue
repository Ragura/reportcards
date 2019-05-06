<template>
  <div class="flex" id="app">
    <sidebar
      class="flex-none overflow-auto h-screen hidden sm:block w-56 py-10"
    />
    <main class="container h-screen overflow-auto mx-auto p-8">
      <router-view />
    </main>
    <app-modal />
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import AppModal from "@/components/AppModal.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AppModal,
    Sidebar
  },
  methods: {
    ...mapActions(["fetchSettings"])
  },
  created() {
    this.fetchSettings();
  }
};
</script>

<style lang="scss"></style>
