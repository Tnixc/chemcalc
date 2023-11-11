<template>
  <Nav />
  <div
    class="my-4 bg-amber-500/10 p-4 rounded-xl ring-2 ring-amber-400 shadow-lg"
  >
    <h1 class="text-lg">
      Enter an element and it's percentage mass in the following format:
    </h1>
    <code class="text-lg font-bold">Element: percent</code>
    <p>Error: ±0.05</p>
  </div>
  <div>
    <In :items="myArray" @calculate="handleCalculate"></In>
  </div>
  <div>
    <Out :v="result"></Out>
  </div>
</template>
<script lang="ts">
import In from "@/components/Empirical/In.vue";
import Out from "@/components/Empirical/Out.vue";
import Nav from "@/components/Nav.vue";

import { removeItemsWithoutColon, turnIntoObjectByColon, removeJunkFromObjectValue } from "@/scripts/empirical";
export default {
  components: {
    In,
    Out,
    Nav,
  },
  data() {
    return {
      myArray: ["", "", ""],
      result: "",
    };
  },
  methods: {
    handleCalculate(calculatedArray: Array<string>) {
      var filteredArray = removeItemsWithoutColon(calculatedArray);
      var obj = removeJunkFromObjectValue(turnIntoObjectByColon(filteredArray));
      this.result = calculatedArray.join(" ");
    },
  },
};
</script>
