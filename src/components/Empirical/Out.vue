<template>
  <div>
    <p>Values in Another Component:</p>
    <p>{{ v }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    v: String,
  },
};
</script>
