<template>
  <div>
    <h1 class="text-5xl"><span v-html="chemicalizeString"></span></h1>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    inputData: String,
  },
  computed: {
    chemicalizeString() {
      return this.inputData.split(/(\d+)/).map((s, i) => i % 2 ? `<sub>${s}</sub>` : s).join('');
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap');
h1{
  font-family: 'IBM Plex Serif', serif;
}
</style>
