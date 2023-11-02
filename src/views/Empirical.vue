<script setup lang="ts">
import Nav from "../components/Nav.vue";
import In from "../components/Empirical/In.vue";
import Logic from "../components/Empirical/Logic.vue";
</script>

<template>
  <main>
    <Nav />
    <In @calculate="handleCalculate" />
    <Logic :inputData="inputData" />
  </main>
</template>

<script lang="ts">
export default {
  components: {
    In,
    Logic,
  },
  data() {
    return {
      inputData: [{ element: "", percentage: ""}],
    };
  },
  methods: {
    handleCalculate(data: [{ element: string; percentage: string }]) {
      this.inputData = data;
    },
  },
};
</script>
