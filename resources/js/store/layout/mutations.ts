import Seat from "../../modules/layout/Seat";
import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
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
    }
};

export default mutations;
