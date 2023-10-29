<template>
  <div class="">
    <p v-for="(count, element) in chemicalizeString" :key="element">
      {{ element }}: {{ count }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  evaluateElementCounts,
  convertStringsToInt,
  tokenize,
  // filterInvalidElements,
} from "../../scripts/element";

export default {
  props: {
    inputData: String,
  },

  computed: {
    chemicalizeString() {
      let input: string = this.inputData!;
      // let tokens = tokenize(input);
      // let filtered = await filterInvalidElements(tokens);
      // let arr = convertStringsToInt(filtered);
      // let counts = evaluateChemicalFormula(arr);
      let counts = evaluateElementCounts(
        convertStringsToInt(tokenize(input))
      );
      return counts;
    },
  },
};
</script>
<style scoped>
* {
  font-family: "IBM Plex Serif", serif;
  font-size: 2rem;
}
</style>
