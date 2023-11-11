<template>
  <div
    class="my-4 bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral shadow-lg flex flex-col gap-2 max-w-xs"
  >
    <div v-for="(value, index) in items" :key="index" class="flex gap-2">
      <input
        type="text"
        v-model="items![index]"
        class="input w-full"
        placeholder="Element: Percentage"
      />
      <button class="btn hover:btn-error p-0" @click="removeIndex(index)">
        <svg
          class="fill-[currentColor]"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#ffffff"
          viewBox="0 0 256 256"
        >
          <path
            d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
          ></path>
        </svg>
      </button>
    </div>
    <button class="btn" @click="addItem">Add</button>
  </div>
  <div
    class="my-4 bg-base-200/50 p-4 rounded-xl ring-2 ring-neutral shadow-lg flex flex-col gap-2 max-w-xs"
  >
    <button class="btn btn-accent" @click="calculate">Calculate</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    items: Array,
  },
  methods: {
    addItem() {
      this.items!.push("");
    },
    removeIndex(index: number) {
      this.items!.splice(index, 1);
    },
    calculate() {
      this.$emit("calculate", this.items);
    },
  },
};
</script>
