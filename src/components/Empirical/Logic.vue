<template><p v-html="that"></p></template>
<script lang="ts">
import { cleanUpMolarMass, validElementSymbols } from "../../scripts/empirical";
export default {
  props: {
    inputData: {
      type: Array, // Change the type to Array
      required: true,
  },
  computed: {
    that() {
      let data = this.inputData;
      let x = Number(cleanUpMolarMass(data[0].molarMass));
      console.log(x)
      data[0].molarMass = "";
      console.log(data);
      for (let i = data.length - 1; i >= 0; i--) {
        const element = data[i].element;
        if (!validElementSymbols.includes(element)) {
          data.splice(i, 1);
        }
      }
      console.log(data);
    },
  },
}
}
</script>
