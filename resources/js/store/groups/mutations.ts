import { MutationTree } from "vuex";
//@ts-ignore
import { GroupsState, Groups, MessageState, Message } from "@/store/types";

const groupsMutations: MutationTree<GroupsState> = {
    setLoading: (state, loading: Groups["loading"]) => {
        state.loading = loading;
    },
    setGroups: (state, groups: Groups["groups"]) => {
        state.groups = [];
        state.groups = groups.slice();
    },
    setDate: (state, date: Groups["date"]) => {
        state.date = date;
    },
    setGroupId: (state, groupId: Groups["groupId"]) => {
      state.groupId = groupId;
    },
    setLayoutId: (state, layoutId: Groups["layoutId"]) => {
      state.layoutId = layoutId;
    },
    setReserveSeats: (state, reserveSeats: Groups["reserveSeats"]) => {
      state.reserveSeats = [];
      state.reserveSeats = reserveSeats.slice();
    },
    setLayoutReserveSeats: (state, layoutReserveSeats: Groups["layoutReserveSeats"]) => {
      state.layoutReserveSeats = [];
      state.layoutReserveSeats = layoutReserveSeats.slice();
    },
};

const messageMutations: MutationTree<MessageState> = {
    setSuccess: (state, message: Message["success"]) => {
        state.success = "";
        state.success = message;
    },
    setWarning: (state, message: Message["warning"]) => {
        state.warning = "";
        state.warning = message;
    },
    setError: (state, message: Message["error"]) => {
        state.error = "";
        state.error = message;
    }
};

const mutations = {
    groupsMutations,
    messageMutations
};

export default mutations;
