<template>
    <ul class="flex gap-2 flex-col w-1/2 flex-grow">
      <li
      class="rounded-xl flex w-full bg-secondary min-w-full"
      v-for="(element, index) in parsedElements"
        :key="index"
      >
        <div class="p-0 aspect-square">
          <div
            class="aspect-square p-1 rounded-xl shadow-md flex justify-center"
            v-bind:style="
              'background: hsl(' +
              Math.floor((element.number / 118) * 360) +
              ', 80%, 80%)'
            "
          >
            <h1
              class="p-0 text-3xl font-semibold text-center flex items-center text-slate-800"
            >
              {{ element.symbol }}
            </h1>
          </div>
        </div>
        <div class="p-2 flex-grow flex flex-col">
          <code><b>{{element.name}}</b></code>
        </div>
        <div>
          <img class="p-2 max-h-20" :src="element.bohr_model_image" alt="" />
        </div>
      </li>
    </ul>
</template>

<script>
function splitAtomicSymbols(input) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map((token) =>
    token.replace(/\d/g, "")
  );
  return atomicSymbolsWithoutNumbers;
}

export default {
  props: {
    inputData: String,
  },
  data() {
    return {
      elements: [],
      parsedElements: [],
    };
  },
  async created() {
    // Fetch element data from a remote JSON file URL
    const response = await fetch(
      "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
    ); // Replace with your remote URL
    const data = await response.json();
    this.elements = data.elements;

    // Start parsing the input
    this.parseInput(this.inputData);
  },
  watch: {
    inputData(newValue, oldValue) {
      this.parseInput(newValue);
    },
  },
  methods: {
    parseInput(input) {
      const sanitizedTokens = splitAtomicSymbols(input);

      const parsedElements = [];

      for (const element of this.elements) {
        for (const token of sanitizedTokens) {
          if (element.symbol === token) {
            if (!parsedElements.some((e) => e.symbol === token)) {
              // Check if the token is not already in parsedElements
              parsedElements.push(element);
            }
          }
        }
      }

      this.parsedElements = parsedElements;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Space+Mono&display=swap');h1{
  font-family: 'Space Mono', monospace;
}
</style>