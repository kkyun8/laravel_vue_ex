import { ActionTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";

const actions: ActionTree<LayoutState, RootState> = {
    getHalls: async ({ commit }, layout: Layout) => {
        const response = await window.axios.get("/api/halls");
        commit("setHalls", response.data);
    },
    getHallLayout: async ({ commit }, layoutId: Layout["layoutId"]) => {
        const response = await window.axios.get("/api/layout/" + layoutId);
        commit("setHallLayout", response.data);
    }
};

export default actions;
