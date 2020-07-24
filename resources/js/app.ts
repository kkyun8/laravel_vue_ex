import bootstrap from "./bootstrap";

import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Notifications from "vue-notification";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Notifications);

bootstrap();

const createApp = async () => {
    new Vue({
        el: "#app",
        router,
        store,
        components: { App },
        template: "<App />"
    });
};

createApp();
