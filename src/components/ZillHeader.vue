<template>
  <div
    class="zill-header flex justify-between items-center border-b tracking-wider font-bold border-black"
  >
    <h2 class="uppercase"><slot></slot></h2>
    <div class="flex">
      <img
        v-for="id of zills"
        :key="id"
        :src="require(`@/assets/images/zill/${getZillObject(id).icon}`)"
        :alt="getZillObject(id).name"
      />
    </div>
  </div>
</template>

<script>
import zillList from "../data/zill";

export default {
  data: function() {
    return {
      zillList
    };
  },
  props: {
    zills: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getZillObject(id) {
      return this.zillList.find(z => {
        return z.id === id;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.zill-header {
  padding: 0.2cm;

  height: 1.5cm;

  img {
    height: 1cm;
    margin-left: 0.4cm;
  }
}
</style>
