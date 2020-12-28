import { Seat } from "../../modules/layout/Seat";
import { SeatGroup } from "../../modules/layout/SeatGroup";
import { MutationTree } from "vuex";
// @ts-ignore
import { LayoutState, Layout, CommonState, Common } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
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
    setEditSeatGroupsMinId: (
        state,
        editSeatGroupsMinId: Layout["editSeatGroupsMinId"]
    ) => {
        state.editSeatGroupsMinId = editSeatGroupsMinId;
    },
    setActiveLayoutId: (state, activeLayoutId: Layout["activeLayoutId"]) => {
        state.activeLayoutId = activeLayoutId;
    },
    setActiveStartTime: (state, activeStartTime: Layout["activeStartTime"]) => {
        state.activeStartTime = activeStartTime;
    },
    setActiveEndTime: (state, activeEndTime: Layout["activeEndTime"]) => {
        state.activeEndTime = activeEndTime;
    },
    setActiveLayoutIds: (state, activeLayoutIds: Layout["activeLayoutIds"]) => {
        state.activeLayoutIds = activeLayoutIds;
    },
};

export default mutations;
