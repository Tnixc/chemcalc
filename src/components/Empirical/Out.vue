<template>
  <div
    class="my-4 bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral shadow-lg flex flex-col gap-2 max-w-xs"
  >
    <p>Result:</p>
    <div class="flex flex-col">
      <div v-for="(value, index) in v" :key="index" class="flex gap-2">
        <p class="text-2xl text-right w-[2ch] opacity-60">{{ index }}</p><p class="text-2xl ">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    v: Object,
  },
};
</script>
<style scoped>
*{
  font-family: "jetbrains mono", monospace;
}
</style>