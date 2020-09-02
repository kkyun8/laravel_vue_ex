import { MutationTree } from "vuex";
//@ts-ignore
import { GroupsState, Groups, MessageState, Message } from "@/store/types";

const groupsMutations: MutationTree<GroupsState> = {
    setLoading: (state, loading: Groups["loading"]) => {
        state.loading = loading;
    },
    setGroups: (state, groups: Groups["groups"]) => {
        state.groups = [];
        groups.forEach((e: any) => state.groups.push(e));
    },
    setDate: (state, date: Groups["date"]) => {
        state.date = date;
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
