import { Seat } from "../../modules/layout/Seat";
import { SeatGroup } from "../../modules/layout/SeatGroup";
import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout, MessageState, Message } from "@/store/types";

const layoutMutations: MutationTree<LayoutState> = {
    setLoading: (state, loading: Layout["loading"]) => {
        state.loading = loading;
    },
    setHalls: (state, halls: Layout["halls"]) => {
        state.halls = [];
        state.halls = halls.slice();
    },
    setHallLayout: (state, hallLayout: Layout["hallLayout"]) => {
        state.hallLayout = [];
        state.hallLayout = hallLayout.slice();
    },
    setSeats: (state, seats: Layout["seats"]) => {
        state.seats = [];
        seats.forEach((e: any) => {
            const seat = new Seat(e);
            state.seats.push(seat);
        });
    },
    setSeatGroups: (state, seatGroups: Layout["seatGroups"]) => {
        state.seatGroups = [];
        seatGroups.forEach((e: any) => {
            const seat = new SeatGroup(e);
            state.seatGroups.push(seat);
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
        state.editSeats = editSeats.slice();
    },
    setEditSeatGroups: (state, editSeatGroups: Layout["editSeatGroups"]) => {
        state.editSeatGroups = [];
        state.editSeatGroups = editSeatGroups.slice();
    },
    setEditSeatsMinId: (state, editSeatsMinId: Layout["editSeatsMinId"]) => {
      state.editSeatsMinId = editSeatsMinId;
    },
    setEditSeatGroupsMinId: (state, editSeatGroupsMinId: Layout["editSeatGroupsMinId"]) => {
      state.editSeatGroupsMinId = editSeatGroupsMinId;
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
