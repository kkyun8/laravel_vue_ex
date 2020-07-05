import bootstrap from "./bootstrap";

import Vue from "vue";
import router from "./router";
//import store from './store'
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
bootstrap();

//アプリ起動時、Vue インスタンス生成前に currentUser アクション呼び出します。
//ユーザー情報が存在する場合、読み込む
const createApp = async () => {
    //await store.dispatch('auth/currentUser')

    new Vue({
        el: "#app",
        router,
        //store,
        components: { App },
        template: "<App />"
    });
};

createApp();
