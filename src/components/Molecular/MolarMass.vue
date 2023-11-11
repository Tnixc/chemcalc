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
} from "../../scripts/molecular";

export default {
  props: {
    inputData: String,
  },
  computed: {
    total() {
      var input: string = this.inputData!;
      var counts = evaluateElementCounts(convertStringsToInt(tokenize(input)));
      var namesAndcounts = getElementNameFromSymbol(counts, elementDataObject);
      var total = getTotalMolarMass(namesAndcounts);
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
../../scripts/molecular