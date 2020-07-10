import { ActionTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";

const actions: ActionTree<LayoutState, RootState> = {
    getLayout: async ({ commit }, layout: Layout) => {
        const response = await window.axios.get("/api/halls");
        commit("setHalls", response.data);
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
