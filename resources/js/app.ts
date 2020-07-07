import bootstrap from "./bootstrap";

import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
bootstrap();

const createApp = async () => {
    //await store.dispatch('auth/currentUser')

    new Vue({
        el: "#app",
        router,
        store,
        components: { App },
        template: "<App />"
    });
};

createApp();
