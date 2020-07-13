import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
    setHalls: (state, halls: Layout["halls"]) => {
        halls.forEach(e => state.halls.push(e));
    },
    setHallLayout: (state, hallLayout: Layout["hallLayout"]) => {
        hallLayout.forEach(e => state.hallLayout.push(e));
    },
    setSeats: (state, seats: Layout["seats"]) => {
        seats.forEach(e => state.seats.push(e));
    },
    setHallId: (state, hallId: Layout["hallId"]) => {
        state.hallId = hallId;
    },
    setLayoutId: (state, layoutId: Layout["layoutId"]) => {
        state.layoutId = layoutId;
    }
};

export default mutations;
