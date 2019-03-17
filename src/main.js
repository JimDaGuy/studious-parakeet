import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";

Vue.prototype.$http = axios;
Vue.use(KeenUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
