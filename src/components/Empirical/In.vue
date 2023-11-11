<template>
  <div
    class="my-4 bg-amber-500/10 p-4 rounded-xl ring-2 ring-amber-400 shadow-lg"
  >
    <h1 class="text-lg">
      Enter an element and it's percentage mass in the following format:
    </h1>
    <code class="text-lg font-bold">Element: percent</code>
    <p>Error: ±0.05</p>
  </div>
  <div class="my-4 bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral shadow-lg flex flex-col gap-2 max-w-xs">
    <div v-for="(value) in arr">
      <span>{{ value }}</span>
      <input type="text" class="input w-full">
    </div>
    <button class="btn btn-accent" @click="$emit('add')">Add</button>
  </div>
  <button class="btn"></button>
</template>

<script lang="ts">
export default {
  props: {
    arr: Array,
  },
};
</script>
