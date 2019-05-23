<template>
  <div class="question flex border border-black">
    <section class="w-1/2 padding border-r border-black">
      <div
        v-if="content.layout === 'smileys' || content.layout === 'score'"
        v-html="content.question"
      ></div>
      <div v-else-if="content.layout === 'image'" class="flex items-center">
        <img
          style="height: 2.5cm; max-width: 5cm; margin-right: 0.2cm;"
          src="@/assets/images/leren.png"
          alt="Afbeelding leren"
        />
        <p class="flex-shrink" v-html="content.question"></p>
      </div>
    </section>
    <section class="w-1/2">
      <div
        class="flex h-full items-center justify-center"
        v-if="content.layout === 'smileys'"
      >
        <img
          style="height: 2.7cm"
          src="@/assets/images/smileys.jpeg"
          alt="Smileys"
        />
      </div>
      <div
        class="score flex h-full items-center justify-center text-center"
        v-else-if="content.layout === 'score'"
      >
        <p>... / 10</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    content: {
      type: Object
    }
  }
};
</script>

<style scoped>
.question {
  white-space: pre-wrap;
  height: 3cm;
}

.question section.padding {
  padding: 0.2cm;
}

.score {
  font-size: 55px;
}
</style>
