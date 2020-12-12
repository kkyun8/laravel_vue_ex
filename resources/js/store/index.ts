import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { layout } from "./layout";
import { groups } from "./groups";
import { common } from "./common";
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: "1.0.0",
        common: {
          loading: false,
          success: "",
          warning: "",
          error: ""
        }
    },
    modules: {
        layout,
        groups,
        common
    }
};

export default new Vuex.Store<RootState>(store);
