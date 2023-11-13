import "./main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
//@ts-ignore
app.use(router);

app.mount("#app");
