import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
    setHalls: (state, halls: Layout["halls"]) => {
        state.halls.push(halls);
    }
};

export default mutations;
