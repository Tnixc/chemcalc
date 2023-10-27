<template>
  <div class="py-10 ">
    <div class="p-8 ring-2 rounded-xl shadow-xl ring-neutral-focus">
      <h1 class="text-3xl flex justify-center overflow-y-hidden overflow-x-scroll"><span v-html="chemicalizeString"></span></h1>
    </div> 
  </div>
</template>

<script lang="ts">
export default {
  props: {
    inputData: String,
  },
  computed: {
    chemicalizeString() {
      let input = this.inputData;
      // Check if the input string is empty
      if (!input) {
        input = "wow such empty";
      }
      return input.split(/(\d+)/).map((s, i) => i % 2 ? `<sub>${s}</sub>` : s).join('');
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
