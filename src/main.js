import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store.js";

import "bootstrap";

Vue.config.productionTip = false;

// login url
// https://financedashboard.auth.ca-central-1.amazoncognito.com/login?response_type=code&client_id=517fr70n5r9ni648i0vsiedu7j&redirect_uri=https://localhost:8080/
new Vue({
	store: store,
	render: h => h(App),
}).$mount("#app");
