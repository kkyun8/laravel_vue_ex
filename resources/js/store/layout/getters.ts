import { Seat, SeatInterface } from "../../modules/layout/Seat";
import { GetterTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";

const layoutGetters: GetterTree<LayoutState, RootState> = {
    //TODO:
    // geteditSeats: (state: LayoutState) => {
    //     const data = [];
    //     state.layout.hallHayout.forEach(seat => {
    //         const object = new Seat(seat);
    //         data.push(object);
    //     });
    //     return data;
    // },
    // layoutToDivBox: (state: LayoutState) => {
    //     return state.layout.layoutId.length;
    // },
    // seatsToPattern: (state: LayoutState) => {
    //     return state.layout.layoutId.length;
    // },
    // patternToSeats: (state: LayoutState) => {
    //     return state.layout.layoutId.length;
    // }
};

const getters = {
    // layoutGetters
};

export default getters;
