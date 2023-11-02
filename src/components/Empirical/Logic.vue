<template><p v-html="that"></p></template>
<script lang="ts">
import { cleanUpMolarMass } from "../../scripts/empirical";
export default {
  props: {
    inputData: {
      type: Array<any>,
      required: true,
    },
  },
  computed: {
    that() {
      const data = this.inputData;
      let x = cleanUpMolarMass(data[0].molarMass);
      console.log("1:");
      console.log(data);
    },
  },
};
</script>
