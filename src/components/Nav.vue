<script setup lang="ts"></script>

<template>
  <nav class="p-5 flex justify-between">
    <div class="left flex gap-3">
      <router-link
        class="btn"
        :class="{ active: $route.path === '/molecular' }"
        to="/molecular"
      >
        Molecular
      </router-link>

      <router-link
        class="btn"
        :class="{ active: $route.path === '/emperical' }"
        to="/emperical"
      >
        Emperical
      </router-link>

      <router-link
        class="btn"
        :class="{ active: $route.path === '/balance' }"
        to="/balance"
      >
        Balance
      </router-link>
    </div>
    <div class="right flex gap-3">
      <button class="btn" data-set-theme="dark" data-act-class="ACTIVECLASS">
        dark
      </button>
      <button class="btn" data-set-theme="light" data-act-class="ACTIVECLASS">
        light
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { themeChange } from "theme-change";

export default {
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
};
</script>
