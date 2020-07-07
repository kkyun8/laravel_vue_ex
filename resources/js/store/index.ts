import Vue from "vue";
import Vuex from "vuex";
import layout from "./layout";
import error from "./error";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        layout,
        error
    }
});

export default store;
