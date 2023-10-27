<template>
  <div>
    <h1 class="">Render: <span v-html="chemicalizeString"></span></h1>
  </div>
</template>

<script>
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
