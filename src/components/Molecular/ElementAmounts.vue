<template>
  <div>
    <ul>
      <li v-for="(symbolData, symbol) in amounts" :key="symbol">
        <p>{{ symbol }} - {{ symbolData[0] }}: {{ symbolData[1] }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  evaluateElementCounts,
  convertStringsToInt,
  tokenize,
  filterValidElements,
  validElementSymbols,
  getElementNameFromSymbol,
  elementDataObject
} from "../../scripts/element";

export default {
  props: {
    inputData: String,
  },
  computed: {
    amounts() {
      let input: string = this.inputData!;
      let counts = filterValidElements(evaluateElementCounts(convertStringsToInt(tokenize(input))),validElementSymbols);
      let namesAndcounts = getElementNameFromSymbol(counts, elementDataObject);
      console.log(namesAndcounts);
      return namesAndcounts;
    },
  },
};
</script>
<style scoped>
* {
  font-family: "IBM Plex Serif", serif;
  font-size: 1.5rem;
}
</style>
