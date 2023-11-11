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

import { removeItemsWithoutColon, turnIntoObjectByColon } from "@/scripts/empirical";
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
      console.log("Calculated Array:", calculatedArray);
      let filteredArray = removeItemsWithoutColon(calculatedArray);
      console.log("Filtered Array:", filteredArray);
      let obj = turnIntoObjectByColon(filteredArray);
      console.log("Object:", obj);
      this.result = calculatedArray.join(" ");
    },
  },
};
</script>
