//@ts-ignore
import { GroupsState, RootState, Groups } from "@/store/types";
//@ts-ignore
import Repository from "@/modules/repository/repository.ts";
import { ActionTree } from "vuex";
import { AxiosInstance, AxiosResponse } from "axios";

const groupsActions: ActionTree<GroupsState, RootState> = {
    fetchGroups: async ({ commit }) => {
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/groups"
        ).catch((e: any) => commit("setError", e));
        commit("setGroups", response.data);
        commit("setLoading", false);
    },
};

const actions = {
  groupsActions
};

export default actions;
