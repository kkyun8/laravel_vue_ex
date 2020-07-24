import { ActionTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";

const layoutActions: ActionTree<LayoutState, RootState> = {
    fetchHalls: async ({ commit }) => {
        const response = await window.axios.get("/api/halls");
        commit("setHalls", response.data);
    },
    fetchHallLayout: async ({ commit }, layoutId: Layout["layoutId"]) => {
        const response = await window.axios.get("/api/layout/" + layoutId);
        commit("setHallLayout", response.data);
    },
    createLayout: async ({ commit }, layout: Layout) => {
        const response = await window.axios.post("/api/layout", layout);
        // commit("setHallLayout", response.data);
        console.log(response.data);
    },
    updateLayout: async ({ commit }, layout: Layout) => {
        const response = await window.axios.put("/api/layout", layout);
        commit("setHallLayout", response.data);
    }
};

const actions = {
    layoutActions
};

export default actions;
