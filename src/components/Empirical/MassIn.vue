<template>
  <label class="label">
    <span class="label-text">Molar Mass (g/mol):</span></label
  >
  <input
    class="w-full max-w-none input input-bordered mb-4"
    type="text"
    placeholder="Molar Mass (g/mol)"
    v-model="molarMass"
    @keyup.enter="emitData"
  />
</template>
<script lang="ts">
export default{
  data() {
    return {
      molarMass: "",
    };
  },
  methods: {
    emitData() {
      this.$emit("m", this.molarMass);
    },
  },
  emits: ["m"],
}
</script>