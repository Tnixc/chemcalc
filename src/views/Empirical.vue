<template>
  <Nav />
  <div
    class="my-4 bg-amber-500/10 p-4 rounded-xl ring-2 ring-amber-400 shadow-lg"
  >
    <h1 class="text-lg">
      Enter an element and it's percentage mass in the following format:
    </h1>
    <code class="text-lg font-bold">Element: percent</code>
    <p>* Blanks, duplicated or invalid elements will be removed.</p>
    <p>* Do not put spaces in the element before the colon</p>
  </div>
  <div class="flex flex-wrap max-w-2xl gap-4">
    <In  class="" :items="myArray" @calculate="handleCalculate" />
    <Out class="flex-grow"  :v="result"></Out>
  </div>

</template>
<script lang="ts">
import In from "@/components/Empirical/In.vue";
import Out from "@/components/Empirical/Out.vue";
import Nav from "@/components/Nav.vue";

import {
  removeItemsWithoutColon,
  turnIntoObjectByColon,
  removeJunkFromObjectKey,
  removeJunkFromObjectValue,
  turnValueIntoMoles,
  findRatio,
} from "@/scripts/empirical";
export default {
  components: {
    In,
    Out,
    Nav,
  },
  data() {
    return {
      myArray: ["", "", ""],
      result: {},
    };
  },
  methods: {
    handleCalculate(calculatedArray: Array<string>) {
      var filteredArray = removeItemsWithoutColon(calculatedArray);
      var obj = removeJunkFromObjectValue(removeJunkFromObjectKey(turnIntoObjectByColon(filteredArray)));
      console.log(obj);
      var molarObject = turnValueIntoMoles(obj);
      console.log(molarObject);
      var ratio = findRatio(molarObject);
      console.log(ratio);
      this.result = ratio;
    },
  },
};
</script>
