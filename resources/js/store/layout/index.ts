import { Module } from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";

const state: LayoutState = {
    layout: []
};

export const layout: Module<LayoutState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
