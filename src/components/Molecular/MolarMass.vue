<template>
  <div class="bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral mb-5 shadow-lg">
    <p v-html="total" class="inline pr-2 text-2xl"></p>
    <span>g/mol</span>
  </div>
</template>

<script lang="ts">
import {
  evaluateElementCounts,
  convertStringsToInt,
  tokenize,
  getElementNameFromSymbol,
  elementDataObject,
  getTotalMolarMass,
} from "../../scripts/element";

export default {
  props: {
    inputData: String,
  },
  computed: {
    total() {
      let input: string = this.inputData!;
      let counts = evaluateElementCounts(convertStringsToInt(tokenize(input)));
      let namesAndcounts = getElementNameFromSymbol(counts, elementDataObject);
      let total = getTotalMolarMass(namesAndcounts);
      return total;
    },
  },
};
</script>
<style scoped>
p {
  font-family: "Jetbrains Mono", monospace;
}
</style>
