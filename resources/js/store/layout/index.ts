import { Module } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

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
