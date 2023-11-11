<template>
  <label class="label">
    <span class="label-text">Enter an element or compound</span>
  </label>
  <div class="flex gap-2">
    <input
    v-model="inputData"
    @keyup.enter="emitData"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full"
  />
  <button @click="emitData" class="btn btn-accent aspect-square">▶</button>
  </div>

</template>

<script lang="ts">
export default {
  data() {
    return {
      inputData: "",
    };
  },
  emits: ["input-enter"],
  methods: {
    emitData() {
      this.$emit("input-enter", this.inputData);
    },
  },
};
</script>
