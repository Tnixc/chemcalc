<template>
  <div>
    <p>Values in Another Component:</p>
    <ul>
      <li v-for="value in arr">{{ value }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    arr: Array,
  },
};
</script>
