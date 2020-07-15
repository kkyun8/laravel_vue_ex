import { GetterTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";

const getters: GetterTree<LayoutState, RootState> = {
    layoutToDivBox: (state: LayoutState) => {
        return state.layout.length;
    },
    seatsToPattern: (state: LayoutState) => {
        return state.layout.length;
    },
    patternToSeats: (state: LayoutState) => {
        return state.layout.length;
    }
};

export default getters;
