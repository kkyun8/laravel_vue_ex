import { Module } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const state: LayoutState = {
    code: "",
    halls: [],
    hallLayout: [],
    editSeats: [],
    seats: [],
    hallId: 0,
    layoutId: 0
};

export const layout: Module<LayoutState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
