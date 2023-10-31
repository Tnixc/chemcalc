<template>
  <div class="pt-10 pb-5">
    <div
      class="p-8 ring-2 rounded-xl shadow-xl ring-neutral-focus bg-base-200 bg-opacity-60"
    >
      <h1 class="text-3xl flex justify-center overflow-x-scroll py-2">
        <span v-html="chemicalizeString"></span>
      </h1>
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
      let x = input
        .split(/(\d+)/)
        .map((s, i) => (i % 2 ? `<sub>${s}</sub>` : s))
        .join("");
      return x;
    },
  },
};
</script>
<style scoped>
h1 {
  font-family: "IBM Plex Serif", serif;
}
</style>
