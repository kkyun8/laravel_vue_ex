import { GetterTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";

const getters: GetterTree<LayoutState, RootState> = {
    // size: (state: LayoutState) => {
    //   return state.layout.length;
    // },
};

export default getters;
