<template>
  <label class="label">
    <span class="label-text">Enter an element or compound</span>
  </label>
  <input
    v-model="inputData"
    @keyup.enter="emitData"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full"
  />
</template>
<script lang="ts">
export default {
  data() {
    return {
      inputData: "",
    };
  },
  methods: {
    emitData() {
      this.$emit("input-enter", this.inputData);
    },
  },
};
</script>
