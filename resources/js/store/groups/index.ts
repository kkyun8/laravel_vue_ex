import { Module } from "vuex";
//@ts-ignore
import { GroupsState, MessageState, RootState } from "@/store/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import * as moment from "moment";

const groupsState: GroupsState = {
    loading: true,
    code: "",
    date: moment().format("YYYY-MM-DD"),
    groups: [],
    groupId: 0,
    reserveSeats: [],
    layoutReserveSeats: {},
    layoutId: 0,
    success: "",
    warning: "",
    error: ""
};

export const groups: Module<GroupsState, RootState> = {
    namespaced: true,
    state: groupsState,
    getters,
    actions: actions.groupsActions,
    mutations: mutations.groupsMutations
};

export const messageState: MessageState = {
    success: "",
    warning: "",
    error: ""
};

export const message: Module<MessageState, RootState> = {
    namespaced: true,
    state: messageState,
    // getters,
    //actions: actions,
    mutations: mutations.messageMutations
};
