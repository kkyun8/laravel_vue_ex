//@ts-ignore
import { GroupsState, RootState, Groups } from "@/store/types";
//@ts-ignore
import Repository from "@/modules/repository/repository.ts";
import { ActionTree } from "vuex";
import { AxiosInstance, AxiosResponse } from "axios";

const actions: ActionTree<GroupsState, RootState> = {
    fetchGroups: async ({ commit, rootState }, date: Groups["date"]) => {
        rootState.common.loading = true
        const response: any | AxiosResponse<any> = await Repository.get(
            "/api/groups/" + date
        ).catch((e: any) => {
          return rootState.common.error = e
        }).finally(()=>{
          return rootState.common.loading = false
        })
        commit("setGroups", response.data);
        
    },
    fetchLayoutReserveSeats: async ({ commit, rootState }, groups: Groups) => {
        rootState.common.loading = true
        const response: any | AxiosResponse<any> = await Repository.get(
          "/api/groups/" + groups.date + "/layout_id/" + groups.layoutId
        ).catch((e: any) => {
          return rootState.common.error = e
        }).finally(()=>{
          return rootState.common.loading = false
        });
        commit("setLayoutReserveSeats", response.data);

    },
    setReserveSeats: async ({ commit, rootState }, groups: Groups) => {
        rootState.common.loading = true
        const response: any | AxiosResponse<any> = await Repository.post(
            "/api/groups/reserve_seats",
            groups
        ).catch((e: any) => {
          return rootState.common.error = e
        }).finally(()=>{
          return rootState.common.loading = false
        });
        commit("setLayoutReserveSeats", response.data);
        rootState.common.success = "保存しました。"

    }
};

export default actions;
