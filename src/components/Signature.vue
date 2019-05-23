<template>
  <div class="handtekening border border-black">
    <section style="height: 2.7cm">
      Handtekening ouder(s)
    </section>
    <section>
      Opmerkingen:
    </section>
  </div>
</template>

<script>
export default {
  name: "Signature",
  props: {
    content: {
      type: Object
    }
  }
};
</script>

<style scoped>
.handtekening {
  height: 5.2cm;
  padding: 0.2cm;
}
</style>
