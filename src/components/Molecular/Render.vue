<template>
  <div>
    <p>Mesasage: {{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String, // Define a prop to receive the string from the parent
  },
};
</script>
