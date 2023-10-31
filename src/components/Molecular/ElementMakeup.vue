<template>
  <div class="bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral mb-5 shadow-lg">
    <label for="">Compound makeup by mass</label>
    <div class="flex justify-center p-2 gap-1 bar">
      <span
        v-for="(value, key) in makeup"
        :key="key"
        v-bind:style="'width: ' + value + '%'"
        class="p-1 rounded-md inline-block bg-accent text-accent-content font-bold px-2 min-w-fit shadow-md"
        >{{ key }}</span
      >
    </div>
    <div class="flex flex-wrap dot">
      <div
        v-for="(value, key) in makeup"
        class="w-fit p-2 flex justify-center items-center gap-3"
      >
        <div class="h-4 w-4 rounded-xl shadow-md"></div>
        {{ key }}: {{ value }}%
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  evaluateElementCounts,
  convertStringsToInt,
  tokenize,
  getElementNameFromSymbol,
  elementDataObject,
  getElementMakeup,
} from "../../scripts/element";

export default {
  props: {
    inputData: String,
  },
  computed: {
    makeup() {
      let input: string = this.inputData!;
      let counts = 
        evaluateElementCounts(convertStringsToInt(tokenize(input)));
      let namesAndcounts = getElementNameFromSymbol(counts, elementDataObject);
      let total = getElementMakeup(namesAndcounts);
      return total;
    },
  },
  mounted() {},
};
</script>
<style scoped>
p {
  font-family: "Jetbrains Mono", monospace;
}
.bar > *:nth-child(8n + 1),
.dot > *:nth-child(8n + 1) > * {
  --color: #ffadad;
}

.bar > *:nth-child(8n + 2),
.dot > *:nth-child(8n + 2) > * {
  --color: #ffd6a5;
}

.bar > *:nth-child(8n + 3),
.dot > *:nth-child(8n + 3) > * {
  --color: #fdffb6;
}

.bar > *:nth-child(8n + 4),
.dot > *:nth-child(8n + 4) > * {
  --color: #caffbf;
}

.bar > *:nth-child(8n + 5),
.dot > *:nth-child(8n + 5) > * {
  --color: #9bf6ff;
}

.bar > *:nth-child(8n + 6),
.dot > *:nth-child(8n + 6) > * {
  --color: #a0c4ff;
}

.bar > *:nth-child(8n + 7),
.dot > *:nth-child(8n + 7) > * {
  --color: #bdb2ff;
}

.bar > *:nth-child(8n + 8),
.dot > *:nth-child(8n + 8) > * {
  --color: #ffc6ff;
}

/* Set background colors for .bar and .dot children */
.bar > *,
.dot > * > * {
  background: var(--color);
}
</style>
