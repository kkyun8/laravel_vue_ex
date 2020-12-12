import { MutationTree } from "vuex";
//@ts-ignore
import { CommonState, Common } from "@/store/types";

const mutations: MutationTree<CommonState> = {
    setLoading: (state, loading: Common["loading"]) => {
        state.loading = loading;
    },
    setSuccess: (state, common: Common["success"]) => {
        state.success = "";
        state.success = common;
    },
    setWarning: (state, common: Common["warning"]) => {
        state.warning = "";
        state.warning = common;
    },
    setError: (state, common: Common["error"]) => {
        state.error = "";
        state.error = common;
    }
};

export default mutations;
