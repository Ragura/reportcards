<template>
  <div class="flex" id="app" v-cloak>
    <sidebar
      class="flex-none overflow-auto h-screen hidden sm:block w-56 py-10"
    />
    <main
      v-cloak
      :class="{ 'overflow-visible': printing, 'p-8': !printing }"
      class="container h-screen overflow-auto mx-auto"
    >
      <router-view />
    </main>
    <app-modal />
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import AppModal from "@/components/AppModal.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AppModal,
    Sidebar
  },
  computed: {
    ...mapState(["printing"])
  },
  methods: {
    ...mapActions(["fetchSettings"])
  },
  created() {
    this.fetchSettings();
  }
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Calibri", "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

[v-cloak] > * {
  display: none;
}
[v-cloak]::before {
  content: "loading…";
}
</style>
