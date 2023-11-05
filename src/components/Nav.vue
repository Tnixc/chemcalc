<script setup lang="ts">
import { themeChange } from "theme-change";
import { onMounted, ref } from "vue";

const theme = ref<String>();

onMounted(() => {
  themeChange(false);

  const currentTheme = document
    .querySelector("html")!
    .attributes.getNamedItem("data-theme")!.nodeValue;
  theme.value = currentTheme!;
  console.info(`Theme: ${currentTheme}`);
});

function onThemeToggle() {
  const previousTheme = document
    .querySelector("html")!
    .attributes.getNamedItem("data-theme")!.nodeValue;
  console.info(`Changing theme from: ${previousTheme}`);

  theme.value = previousTheme == "dark" ? "light" : "dark";
}
</script>

<template>
  <nav
    class="flex items-center justify-left flex-wrap glass-gradient rounded-xl shadow-xl max-w-full p-4 top-0 left-0 z-10 sticky"
  >
    <h1 class="text-3xl font-bold px-4 pr-8 logo">Elemental</h1>
    <div
      class="items-center flex-wrap left hidden gap-3 rounded-xl flex-grow md:flex"
    >
      <router-link
        class="btn shadow-md"
        :class="{ active: $route.path === '/molecular' }"
        to="/molecular"
      >
        Molecular
      </router-link>

      <router-link
        class="btn shadow-md"
        :class="{ active: $route.path === '/empirical' }"
        to="/empirical"
      >
        Empirical
      </router-link>

      <router-link
        class="btn shadow-md"
        :class="{ active: $route.path === '/balance' }"
        to="/balance"
      >
        Balance
      </router-link>
      <div class="mr-0 ml-auto hidden flex-col lg:flex">
        <div>
          <span class="text-xs">Latest commit: </span
          ><span v-html="sha" class="text-xs"></span>
        </div>
        <span v-html="d" class="text-right text-xs opacity-50"></span>
      </div>
      <div
        class="tooltip tooltip-bottom mr-0 ml-auto lg:m-0"
        data-tip="Source on GitHub"
      >
        <a
          href="https://github.com/Tnixc/elemental"
          target="_blank"
          class="btn p-0 aspect-square shadow-xl ring-2 ring-base-100"
          ><svg
            class="fill-current text-accent aspect-square"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#629DA2"
            viewBox="0 0 256 256"
          >
            <path
              d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"
            ></path></svg
        ></a>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Theme">
        <button
          @click="onThemeToggle()"
          class="btn p-0 aspect-square shadow-xl ring-2 ring-accent theme-toggle"
          data-toggle-theme="light,dark"
          data-act-class="ACTIVECLASS"
        >
          <svg
            v-if="theme == 'light'"
            class="fill-current text-accent aspect-square"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#5C989D"
            viewBox="0 0 256 256"
          >
            <path
              d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"
            ></path>
          </svg>
          <svg
            v-if="theme == 'dark'"
            class="fill-current text-accent aspect-square"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path
              d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="md:hidden mr-0 ml-auto">
      <details class="dropdown dropdown-end">
        <summary class="shadow-xl btn mr-auto text-accent hover:ring-2 ring-accent" @click="something">{{ text }}</summary>
        <ul
          class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100/50 backdrop-blur-md rounded-box w-52 gap-2 mt-2"
        >
          <router-link
            class="btn shadow-md"
            :class="{ active: $route.path === '/molecular' }"
            to="/molecular"
          >
            Molecular
          </router-link>

          <router-link
            class="btn shadow-md"
            :class="{ active: $route.path === '/empirical' }"
            to="/empirical"
          >
            Empirical
          </router-link>

          <router-link
            class="btn shadow-md"
            :class="{ active: $route.path === '/balance' }"
            to="/balance"
          >
            Balance
          </router-link>
          <br />
          <div class="p-2 flex-col flex">
            <div>
              <span class="text-xs">Latest commit: </span
              ><span v-html="sha" class="text-xs"></span>
            </div>
            <span v-html="d" class="text-xs opacity-50"></span>
          </div>
          <br>

          <div class="flex gap-2 justify-between">
            <div class="tooltip tooltip-bottom" data-tip="Source on GitHub">
              <a
                href="https://github.com/Tnixc/elemental"
                target="_blank"
                class="btn p-0 aspect-square shadow-xl ring-2 ring-base-100"
                ><svg
                  class="fill-current text-accent aspect-square"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#629DA2"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"
                  ></path></svg
              ></a>
            </div>
            <div class="tooltip tooltip-bottom flex-grow" data-tip="Theme">
              <button
                @click="onThemeToggle()"
                class="btn shadow-xl ring-2 w-full ring-accent theme-toggle"
                data-toggle-theme="light,dark"
                data-act-class="ACTIVECLASS"
              >
                <svg
                  v-if="theme == 'light'"
                  class="fill-current text-accent aspect-square"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#5C989D"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"
                  ></path>
                </svg>
                <svg
                  v-if="theme == 'dark'"
                  class="fill-current text-accent aspect-square"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"
                  ></path>
                </svg>
                Theme
              </button>
            </div>
          </div>
        </ul>
      </details>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      sha: null, // Initialize sha with a default value or null
      d: null,
      text: "▼",
    };
  },
  methods: {
    something() {
      let prev = "▼"
      let next = "▲"
      this.text = this.text == prev ? next : prev
    },
  },
  mounted() {
    async function update(this: any) {
      const data = await fetch(
        "https://api.github.com/repos/Tnixc/elemental/branches/main"
      );
      const json = await data.json();
      const x = json.commit.sha;
      this.sha = x.slice(0, 7);
    }
    function convertDate(timestamp: string): string {
      const date = new Date(timestamp);

      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so we add 1.
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    }

    update.call(this);
    async function d(this: any) {
      // Add 'this: any' to enable accessing 'this' inside the function
      const data = await fetch(
        "https://api.github.com/repos/Tnixc/elemental/branches/main"
      );
      const json = await data.json();
      const x = json.commit.commit.author.date;
      this.d = convertDate(x);
    }
    d.call(this);
  },
};
</script>

<style scoped>
h1 {
  font-family: "IBM Plex Serif", serif;
}
</style>
