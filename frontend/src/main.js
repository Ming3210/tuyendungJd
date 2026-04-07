import "./assets/main.css";
import "./assets/font/font.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import store from "./store/store";
import "vuetify/styles";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {
  faAddressCard,
  faAward,
  faBriefcase,
  faAngleDown,
  faGraduationCap,
  faAngleRight,
  faLanguage,
  faBook,
  faMoneyBill,
  faArrowRight,
  faChevronDown,
  faHeart,
  faArchive,
  faMagnifyingGlass,
  faLocationDot,
  faTableList,
  faTableCellsLarge,
  faClock,
  faEye,
  faPaperPlane,
  faVenusMars,
  faUsers,
  faMedal,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
library.add(
  faBriefcase,
  faAngleDown,
  faAddressCard,
  faAward,
  faGraduationCap,
  faAngleRight,
  faLanguage,
  faBook,
  faMoneyBill,
  faBriefcase,
  faArrowRight,
  faChevronDown,
  faHeart,
  faArchive,
  faMagnifyingGlass,
  faLocationDot,
  faTableCellsLarge,
  faTableList,
  faClock,
  faEye,
  faPaperPlane,
  faVenusMars,
  faUsers,
  faMedal,
  faRotateRight
);
app.use(Antd);
app.use(vuetify);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
