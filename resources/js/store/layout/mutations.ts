import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
    add: (state, layout: Layout) => {
        state.layout.push(layout);
    }
    // remove: (state, id: string) => {
    //   state.todos = state.todos.filter((e: Todo) => e.id !== id);
    // },
};

export default mutations;
