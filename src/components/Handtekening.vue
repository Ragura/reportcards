<template>
  <div class="handtekening border border-black">
    <section style="height: 3.5cm">
      Handtekening ouder(s)
    </section>
    <section>
      Opmerkingen:
    </section>
  </div>
</template>

<script>
export default {
  name: "EindCommentaar",
  props: {
    content: {
      type: Object
    }
  }
};
</script>

<style scoped>
.handtekening {
  height: 6cm;
  padding: 0.2cm;
}
</style>
