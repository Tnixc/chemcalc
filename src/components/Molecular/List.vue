<template>
  <div>
    <ul>
      <li v-for="(element, index) in parsedElements" :key="index">
        {{ element.name }} ({{ element.symbol }}) - {{ element.atomic_mass }}
      </li>
    </ul>
  </div>
</template>

<script>
function splitAtomicSymbols(input) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map(token => token.replace(/\d/g, ''));
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
    const response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json'); // Replace with your remote URL
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
            parsedElements.push(element);
          }
        }
      }

      this.parsedElements = parsedElements;
    },
  },
};
</script>
