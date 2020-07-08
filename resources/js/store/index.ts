import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { layout } from "./layout";

const store: StoreOptions<RootState> = {
    state: {
        version: "1.0.0"
    },
    modules: {
        layout
    }
};

export default new Vuex.Store<RootState>(store);
