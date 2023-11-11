<script setup lang="ts">
import Nav from "../components/Nav.vue";
import In from "../components/Empirical/In.vue";
import Out from "../components/Empirical/Out.vue";
</script>
<template>
  <div>
    <Nav />
    <In :arr="arr" @add="addToArray"></In>
    <Out :arr="arr"></Out>
  </div>
</template>

<script lang="ts">
export default {
  components: {
    In,
    Out,
  },
  data() {
    return {
      arr: [""],
    };
  },
  methods: {
    addToArray() {
      this.arr.push("");
    },
  },
};
</script>
