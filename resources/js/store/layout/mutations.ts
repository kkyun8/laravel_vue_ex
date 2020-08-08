import { Seat } from "../../modules/layout/Seat";
import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout, MessageState, Message } from "@/store/types";

const layoutMutations: MutationTree<LayoutState> = {
    setLoading: (state, loading: Layout["loading"]) => {
        state.loading = loading;
    },
    setHalls: (state, halls: Layout["halls"]) => {
        state.halls = [];
        halls.forEach((e: any) => state.halls.push(e));
    },
    setHallLayout: (state, hallLayout: Layout["hallLayout"]) => {
        state.hallLayout = [];
        hallLayout.forEach((e: any) => {
            state.hallLayout.push(e);
        });
    },
    setSeats: (state, seats: Layout["seats"]) => {
        state.seats = [];
        seats.forEach((e: any) => {
            const seat = new Seat(e);
            state.seats.push(seat);
        });
    },
    setHallId: (state, hallId: Layout["hallId"]) => {
        state.hallId = hallId;
    },
    setLayoutId: (state, layoutId: Layout["layoutId"]) => {
        state.layoutId = layoutId;
    },
    setEditSeats: (state, editSeats: Layout["editSeats"]) => {
        state.editSeats = [];
        editSeats.forEach((e: any) => {
            state.editSeats.push(e);
        });
    },
    setError: (state, message: Layout["error"]) => {
        state.error = "";
        state.error = message;
    },
    setSuccess: (state, message: Layout["success"]) => {
        state.success = "";
        state.success = message;
    }
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
    layoutMutations,
    messageMutations
};

export default mutations;
