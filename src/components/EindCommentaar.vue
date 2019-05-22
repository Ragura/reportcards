<template>
  <textarea
    class="border border-black w-full"
    v-html="leerlingen[activeLeerling].punten[content.commentKey]"
    @blur="
      updatePunten({
        leerlingId: activeLeerling,
        evaluatieId: content.commentKey,
        value: $event.target.value
      })
    "
  >
  </textarea>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EindCommentaar",
  props: {
    content: {
      type: Object
    }
  },
  computed: {
    ...mapState(["leerlingen", "activeLeerling"])
  },
  methods: {
    ...mapActions(["updatePunten"])
  }
};
</script>

<style scoped>
textarea {
  height: 6cm;
  padding: 0.2cm;
}
</style>
