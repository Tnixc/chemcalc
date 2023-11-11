<script setup lang="ts">
import In from "@/components/Empirical/In.vue";
import Out from "@/components/Empirical/Out.vue";
import Nav from "@/components/Nav.vue";
</script>
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
</template>

<script lang="ts">
export default {
  components: {
    In,
  },
  data() {
    return {
      myArray: ["", "", ""],
    };
  },
  methods: {
    handleCalculate(calculatedArray: Array<string>) {
      console.log("Calculated Array:", calculatedArray);
    },
  },
};
</script>
