//@ts-ignore
import { GroupsState, RootState, Groups } from "@/store/types";
//@ts-ignore
import Repository from "@/modules/repository/repository.ts";
import { ActionTree } from "vuex";
import { AxiosInstance, AxiosResponse } from "axios";

const groupsActions: ActionTree<GroupsState, RootState> = {
    fetchGroups: async ({ commit }, date: Groups["date"]) => {
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/groups/" + date
        ).catch((e: any) => commit("setError", e));
        commit("setGroups", response.data);
        commit("setLoading", false);
    },
    setSeats: async ({ commit }, param: Groups["setSeatsParam"]) => {
        const response: any | AxiosResponse<any> = await Repository.put(
            "/api/groups/set_seats",
            param
        ).catch((e: any) => commit("setError", e));
        commit("setGroups", response.data);
        commit("setLoading", false);
    }
};

const actions = {
    groupsActions
};

export default actions;
