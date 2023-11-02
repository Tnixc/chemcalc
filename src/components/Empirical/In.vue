<script setup lang="ts">
import MassIn from "../Empirical/MassIn.vue";
</script>
<template>
  <main class="p-4 flex flex-wrap">
    <div class="min-w-fit">
      <code
        class="block bg-amber-500/20 ring-2 ring-amber-400 mb-4 p-4 rounded-xl"
      >
        Error rate: ±0.05
      </code>
      <MassIn @m="x" />
      <ul class="flex flex-col gap-1">
        <li class="flex flex-wrap">
          <p class="w-1/2 px-3">Element</p>
          <p class="w-1/2 px-3">Percentage Mass</p>
        </li>
        <li v-for="(row, index) in data" :key="index" class="int">
          <input
            type="text"
            placeholder="Element"
            class="input input-bordered w-min max-w-xs"
            v-model="row.element"
            @keyup.enter="addRow"
          />
          <input
            type="text"
            placeholder="Percentage Mass"
            class="input input-bordered w-min max-w-xs"
            v-model="row.percentage"
            @keyup.enter="addRow"
          />
        </li>
      </ul>
      <div class="flex gap-3">
        <button
          @click="addRow"
          class="btn bg-base-200/50 flex-grow mt-2 ring-2 ring-accent"
        >
          Add Row<svg
            class="aspect-square scale-75"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#5C989D"
            viewBox="0 0 256 256"
          >
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
            ></path>
          </svg>
        </button>
        <button
          @click="removeRow"
          class="btn bg-base-200/50 hover:bg-red-400/40 mt-2 ring-2 ring-accent aspect-square"
        >
          <svg
            class="scale-150"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#5C989D"
            viewBox="0 0 256 256"
          >
            <path
              d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
            ></path>
          </svg>
        </button>
      </div>
      <button @click="send" class="btn btn-accent mt-2 w-full">
        Calculate
      </button>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  components: {
    MassIn,
  },
  data() {
    return {
      data: [
        { element: "", percentage: "" }, // Initial row
      ],
      // x: "",
    };
  },
  methods: {
    addRow() {
      this.data.push({ element: "", percentage: "" });
    },
    removeRow() {
      if (this.data.length > 1) {
        this.data.pop();
      }
    },
    send() {
      this.$emit("calculate", this.data);
    },
    x(data: any) {
      // this.enter = data;
      console.log(data);
    },
  },
};
</script>

<style scoped>
.int {
  @apply flex gap-1 flex-wrap;
}
</style>
