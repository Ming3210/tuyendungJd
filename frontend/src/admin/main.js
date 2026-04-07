import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import store from "./store/store";
import router from "./router";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
library.add(faHeart);
app.use(Antd);
app.use(store);
app.use(router);
// app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
