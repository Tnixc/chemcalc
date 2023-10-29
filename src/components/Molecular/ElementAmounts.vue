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
  filterValidElements,
  validElementSymbols,
} from "../../scripts/element";

export default {
  props: {
    inputData: String,
  },

  computed: {
    chemicalizeString() {
      let input: string = this.inputData!;
      let counts = filterValidElements(
        evaluateElementCounts(convertStringsToInt(tokenize(input))),
        validElementSymbols
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
