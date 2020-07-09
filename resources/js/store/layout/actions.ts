import { ActionTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";
import Axios from "axios";

const actions: ActionTree<LayoutState, RootState> = {
    add: async ({ commit }, layout: Layout) => {
        commit("add", layout);
        return true;
    }
    // remove: async ({ commit }, id: string) => {
    //     if (await someAsyncRemoveMethod(id)) {
    //         commit("remove", id);
    //         return true;
    //     }
    //     return false;
    // }
};

export default actions;
