<template>
  <div class="">
    <p v-for="(count, element) in chemicalizeString" :key="element">
      {{ element }}: {{ count }}
    </p>
  </div>
</template>

<script lang="ts">
import { evaluateChemicalFormula, convertStringsToInt, tokenize } from "../../scripts/element.ts";

export default {
  props: {
    inputData: String,
  },
  computed: {
    chemicalizeString() {

      let input: string = this.inputData!;
      let counts = evaluateChemicalFormula(convertStringsToInt(tokenize(input)));

      return counts;
    },
  }
}
</script>
<style scoped>
* {
  font-family: "IBM Plex Serif", serif;
  font-size: 2rem;
}
</style>
