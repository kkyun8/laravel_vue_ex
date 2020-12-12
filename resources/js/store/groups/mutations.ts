import { MutationTree } from "vuex";
//@ts-ignore
import { GroupsState, Groups, CommonState, Common } from "@/store/types";

const mutations: MutationTree<GroupsState> = {
    setGroups: (state, groups: Groups["groups"]) => {
        state.groups = [];
        groups.sort((a:any, b:any)=>{
          return a.id - b.id
        })
        state.groups = groups.slice();

    },
    setDate: (state, date: Groups["date"]) => {
        state.date = date;
    },
    setGroupId: (state, groupId: Groups["groupId"]) => {
      state.groupId = groupId;
    },
    setLayoutId: (state, layoutId: Groups["layoutId"]) => {
      state.layoutId = layoutId;
    },
    setReserveSeats: (state, reserveSeats: Groups["reserveSeats"]) => {
      state.reserveSeats = [];
      state.reserveSeats = reserveSeats.slice();
    },
    setLayoutReserveSeats: (state, layoutReserveSeats: Groups["layoutReserveSeats"]) => {
      state.layoutReserveSeats = {};
      Object.assign(state.layoutReserveSeats,layoutReserveSeats);
    }
};

export default mutations;
