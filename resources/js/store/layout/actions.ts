import { ActionTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";

const actions: ActionTree<LayoutState, RootState> = {
    // add: async ({ commit }, layout: Layout) => {
    //     if (await someAsyncAddMethod(layout)) {
    //         commit("add", layout);
    //         return true;
    //     }
    //     return false;
    // },
    // remove: async ({ commit }, id: string) => {
    //     if (await someAsyncRemoveMethod(id)) {
    //         commit("remove", id);
    //         return true;
    //     }
    //     return false;
    // }
};

export default actions;
