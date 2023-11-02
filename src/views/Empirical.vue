<script setup lang="ts">
import Nav from "../components/Nav.vue";
import In from "../components/Empirical/In.vue";
</script>

<template>
  <main>
    <Nav />
    <In @calculate="handleCalculate"/>
  </main>
</template>

<script lang="ts">
export default {
  components: {
    In
  },
  methods: {
    handleCalculate(data: { element: string; percentage: string }) {
      console.log("Data from child component:", data);
    },
  }
};
</script>