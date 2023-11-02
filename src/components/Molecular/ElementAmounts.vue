<template>
  <div>
    <ul class="bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral shadow-lg">
      <li class="flex h-10 items-center">
        <!-- <span class=""></span> -->
        <strong class="px-1 underline flex-grow text-3xl">Element</strong>
        <strong class="px-1 text-accent underline">Molar Mass</strong>
        <strong class="px-1 text-accent underline">Count</strong>
      </li>
      <li
        class="flex flex-wrap"
        v-for="(symbolData, symbol) in amounts"
        :key="symbol"
      >
        <span class="w-full block text-right px-1">{{ symbol }}</span>
        <span class="px-1 flex-grow">{{ symbolData[0] }}</span>
        <span class="pr-10 max-w-5ch">{{ symbolData[2] }}</span>
        <span class="px-1 text-neutral-content w-10 text-right">{{
          symbolData[1]
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  evaluateElementCounts,
  convertStringsToInt,
  tokenize,
  getElementNameFromSymbol,
  elementDataObject,
} from "../../scripts/molecular";

export default {
  props: {
    inputData: String,
  },
  computed: {
    amounts() {
      let input: string = this.inputData!;
      let counts = evaluateElementCounts(convertStringsToInt(tokenize(input)));
      let namesAndcounts = getElementNameFromSymbol(counts, elementDataObject);
      // console.log(namesAndcounts);
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

li > span {
  font-family: "Jetbrains Mono", monospace;
  opacity: 0.7;
}
li > span:nth-child(1) {
  width: calc(2ch + 1rem);
  opacity: 1;
}
.max-w-5ch {
  max-width: 5ch;
  overflow: hidden;
}
@media only screen and (min-width: 600px) {
  .max-w-5ch {
    max-width: none;
    overflow: hidden;
  }
}
</style>
../../scripts/molecular