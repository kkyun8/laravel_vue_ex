import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Notifications from "vue-notification";
//  SidebarPlugin動作しない
import { SidebarPlugin } from "bootstrap-vue";
Vue.use(SidebarPlugin);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);

const createApp = async () => {
    new Vue({
        el: "#app",
        router,
        store,
        components: { App },
        template: "<App />",
    });
};

createApp();
