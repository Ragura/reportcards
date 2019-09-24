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
    <loading v-show="printing" />
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import AppModal from "@/components/AppModal.vue";
import Loading from "@/components/Loading.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AppModal,
    Sidebar,
    Loading
  },
  computed: {
    ...mapState(["printing", "online"])
  },
  methods: {
    ...mapActions(["fetchSettings", "setOnline"]),
    reportOnline() {
      this.setOnline(navigator.onLine);
    }
  },
  created() {
    this.fetchSettings();
  },
  mounted() {
    window.addEventListener("online", this.reportOnline);
    window.addEventListener("offline", this.reportOnline);
    this.reportOnline();
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
