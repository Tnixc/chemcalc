<template>
  <div>
    <ul class="flex gap-2 flex-col">
      <li v-for="(element, index) in parsedElements" :key="index">
        <!-- {{ element.name }} ({{ element.symbol }}) - {{ element.atomic_mass }} -->
        <div class="flex bg-base-200 p-2">
          <div class="aspect-square w-full">
            <h1 class="text-7xl " v-bind:style="'background: hsl(' + Math.floor((element.number / 118)*360) + ', 80%, 80%)'">{{element.symbol}}</h1>
          </div>
          <div>
            <img :src="element.bohr_model_image" alt="">
          </div>
        </div>
      </li>
    </ul>
  </div>
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
