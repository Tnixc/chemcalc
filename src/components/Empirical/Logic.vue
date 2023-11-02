<template><p v-html="that"></p></template>
<script lang="ts">
export default {
  props: {
    inputData: Object,
  },
  computed: {
    that() {
      const data = this.inputData;
    },
  },
};
</script>
