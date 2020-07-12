import { MutationTree } from "vuex";
//@ts-ignore
import { LayoutState, Layout } from "@/store/types";

const mutations: MutationTree<LayoutState> = {
    setHalls: (state, halls: Layout["halls"]) => {
        //TODO:
        console.log(halls);
        halls.forEach(e => state.halls.push(e));
        for (var h in halls) {
            if (halls[h].layouts.length > 0) {
                mutations.setHallLayout(state, halls[h].layouts);
                for (var l in halls[h].layouts) {
                    if (halls[h].layouts[l].seats.length > 0) {
                        console.log(halls[h].layouts[l].seats);
                        mutations.setSeats(state, halls[h].layouts[l].seats);
                    }
                }
            }
        }
    },
    setHallLayout: (state, hallLayout: Layout["hallLayout"]) => {
        hallLayout.forEach(e => state.hallLayout.push(e));
    },
    setSeats: (state, seats: Layout["seats"]) => {
        seats.forEach(e => state.seats.push(e));
    }
};

export default mutations;
