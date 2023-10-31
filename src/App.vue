<script setup lang="ts">
// import { GeistSans, GeistMono } from 'geist/font'
</script>

<template>
  <main class="p-4">
    <RouterView />
    <div id="bg"></div>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap");
body {
  font-family: "Inter";
}
* {
  box-sizing: border-box;
}
#bg {
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: -1;
  background: radial-gradient(
      63.44% 82.03% at 55.58% -15.63%,
      #5adde6 0%,
      rgba(90, 221, 230, 0.143) 53.72%,
      rgba(90, 221, 230, 0) 100%
    ),
    linear-gradient(
      26.62deg,
      rgba(249, 124, 89, 0.27) 20.64%,
      rgba(249, 124, 89, 0) 49.82%
    ),
    linear-gradient(56.79deg, #ba5be635 33.79%, rgba(185, 91, 230, 0) 72.67%),
    linear-gradient(
      301.08deg,
      rgba(252, 177, 91, 0.265) 20.42%,
      rgba(252, 178, 91, 0) 60.38%
    ),
    linear-gradient(
      141.57deg,
      rgba(78, 172, 235, 0.22) 19.08%,
      rgba(78, 173, 235, 0) 98.72%,
      #e07a0c2f
    );
  background-blend-mode: lighten, screen, multiply, color, color-dodge, darken;
  /* filter: blur(98px); */
}
</style>
