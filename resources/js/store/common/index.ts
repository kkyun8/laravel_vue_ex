import { Module } from "vuex";
//@ts-ignore
import { CommonState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const state: CommonState = {
    loading: true,
    success: "",
    warning: "",
    error: ""
};

export const common: Module<CommonState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
