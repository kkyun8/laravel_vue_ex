import { Module } from "vuex";
//@ts-ignore
import { LayoutState, CommonState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state: LayoutState = {
    code: "",
    halls: [],
    hallLayout: [],
    editSeats: [],
    editSeatGroups: [],
    editSeatsMinId: 0,
    editSeatGroupsMinId: 0,
    seats: [],
    seatGroups: [],
    hallId: 0,
    layoutId: 0,
    activeLayoutId: 0,
    activeStartTime: "",
    activeEndTime: "",
    activeLayoutIds: {},
};

export const layout: Module<LayoutState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
