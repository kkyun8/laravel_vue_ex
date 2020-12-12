import { Module } from "vuex";
//@ts-ignore
import { GroupsState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import * as moment from "moment";

const state: GroupsState = {
    code: "",
    date: moment().format("YYYY-MM-DD"),
    groups: [],
    groupId: 0,
    reserveSeats: [],
    layoutReserveSeats: {},
    layoutId: 0,
};

export const groups: Module<GroupsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
