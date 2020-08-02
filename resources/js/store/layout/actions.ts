//@ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";
//@ts-ignore
import Repository from "@/modules/repository/repository.ts";
import { ActionTree } from "vuex";
import { AxiosInstance, AxiosResponse } from "axios";

const layoutActions: ActionTree<LayoutState, RootState> = {
    fetchHalls: async ({ commit }) => {
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/halls"
        ).catch((e: any) => commit("setError", e));
        commit("setHalls", response.data);
        commit("setLoading", false);
    },
    fetchHallLayout: async ({ commit }, layoutId: Layout["layoutId"]) => {
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/layout/" + layoutId
        ).catch((e: any) => commit("setError", e));
        commit("setHallLayout", response.data);
        commit("setLoading", false);
    },
    createLayout: async ({ commit }, layout: Layout) => {
        const response: any | AxiosResponse<any> = await Repository.post(
            "/api/layout",
            layout
        ).catch((e: any) => commit("setError", e));
        // commit("setHallLayout", response.data);
        // console.log(response.data);
        commit("setLoading", false);
    },
    updateLayout: async ({ commit }, layout: Layout) => {
        const response: any | AxiosResponse<any> = await Repository.put(
            "/api/layout",
            layout
        ).catch((e: any) => commit("setError", e));
        commit("setHallLayout", response.data);
        commit("setSuccess", "保存しました。");
        commit("setLoading", false);
    }
};

const actions = {
    layoutActions
};

export default actions;
