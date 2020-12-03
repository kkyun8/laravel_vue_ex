import { Seat,  } from "../../modules/layout/Seat";
import { GetterTree } from "vuex";
//@ts-ignore
import { LayoutState, RootState } from "@/store/types";

const layoutGetters: GetterTree<LayoutState, RootState> = {
    getMaxSeatId: (state: LayoutState) => {
      if(state.seats.length === 0) return 0

      const maxSeat = state.seats.reduce((a:any, b:any) => {
        if(a.id > b.id){
          return a;
        }else{
         return b;
        }  
      });
      return maxSeat.id;
    }
};

const getters = {
    layoutGetters
};

export default getters;
