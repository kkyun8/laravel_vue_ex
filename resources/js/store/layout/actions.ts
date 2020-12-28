// @ts-ignore
import { LayoutState, RootState, Layout } from "@/store/types";
// @ts-ignore
import Repository from "@/modules/repository/repository.ts";
import { ActionTree } from "vuex";
import { AxiosInstance, AxiosResponse } from "axios";

const actions: ActionTree<LayoutState, RootState> = {
    fetchHalls: async ({ commit, rootState }) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/halls"
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit("setHalls", response.data);
    },
    fetchHallLayout: async (
        { commit, rootState },
        layoutId: Layout["layoutId"]
    ) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/layout/" + layoutId
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit("setHallLayout", response.data);
    },
    createLayout: async ({ commit, rootState }, layout: Layout) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.post(
            "/api/layout",
            layout
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
    },
    updateLayout: async ({ commit, rootState }, layout: Layout) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.put(
            "/api/layout",
            layout
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit("setHallLayout", response.data);
        rootState.common.success = "保存しました。";
    },
    fetchActiveLayouts: async ({ commit, rootState }, layout: Layout) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/active_layouts"
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit(
            "setHalls",
            response.data.map((e: any) => e.halls)
        );
        const obj: any = {};
        response.data.forEach((e: any) => {
            obj[e.hall_id] = e.layout_id;
        });
        commit("setActiveLayoutIds", obj);
    },
    fetchActiveLayoutIds: async ({ commit, rootState }, layout: Layout) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/active_layout_ids"
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit("setActiveLayoutIds", response.data);
    },
    updateActiveLayout: async ({ commit, rootState }, layout: Layout) => {
        rootState.common.loading = true;
        const response: any | AxiosResponse<any> = await Repository.put(
            "/api/active_layout",
            layout
        )
            .catch((e: any) => {
                return (rootState.common.error = e);
            })
            .finally(() => {
                return (rootState.common.loading = false);
            });
        commit("setActiveLayoutIds", response.data);
        rootState.common.success = "保存しました。";
    },
};

export default actions;
