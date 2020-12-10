<template>
    <div>
        <b-row>
            <b-col cols="12">
                <div class="card" style="width:100%; height:600px;">
                    <SeatContainer
                        :layout.sync="layoutSeats"
                        :cellSize="cellSize"
                        :maxColumnCount="maxColumnCount"
                        :maxRowCount="maxRowCount"
                        :margin="margin"
                        :bubbleUp="bubbleUp"
                    >
                        <template v-for="seat in layoutSeats">
                            <SeatBox
                                :boxId="seat.id"
                                :key="'BoxKey:' + seat.id"
                            >
                                <div
                                    class="table p-1 w-100 h-100 seatbox-tooltip"
                                    :class="{
                                        'seat-selected-color': reserveSeats.includes(
                                            seat.id
                                        ),
                                        'border-danger': layoutReserveSeatsMap.has(
                                            seat.id
                                        )
                                    }"
                                    @click.prevent="selectedBox(seat)"
                                >
                                    <span
                                        v-if="
                                            layoutReserveSeatsMap.has(seat.id)
                                        "
                                        class="seatbox-tooltiptext"
                                        ><template
                                            v-for="groupId in layoutReserveSeatsMap.get(
                                                seat.id
                                            )"
                                        >
                                            {{ getGroupsMap.get(groupId) }}
                                        </template>
                                    </span>
                                    {{ seat.name }}
                                    {{ seat.count }}席
                                </div>
                            </SeatBox>
                        </template>
                    </SeatContainer>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import { Seat, SEAT_TYPE_ROOM } from "../../modules/layout/Seat";
import { Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout, GroupsState } from "../../store/types";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import { groups } from "../../store/groups";

@Component({
    components: {
        SeatContainer: Container,
        SeatBox: Box
    }
})
export default class SeatingChartLayout extends Vue {
    @State("layout") layout!: LayoutState;
    @State("groups") groups!: GroupsState;
    @Mutation("setHallLayout", { namespace: "layout" }) setHallLayout: any;
    @Mutation("setSeats", { namespace: "layout" }) setSeats: any;
    @Mutation("setSeatGroups", { namespace: "layout" }) setSeatGroups: any;
    @Mutation("setReserveSeats", { namespace: "groups" }) setReserveSeats: any;
    tipMethod() {
        // Note this is called each time the tooltip is first opened.
        return "<strong>" + new Date() + "</strong>";
    }
    get hallLayout(): LayoutState["hallLayout"] {
        if (this.layout.hallLayout.length > 0) {
            this.seats = this.layout.hallLayout[0].seats;
            this.seatGroups = this.layout.hallLayout[0].seat_groups;
        }
        this.init();
        return this.layout.hallLayout;
    }

    set hallLayout(hallLayout) {
        this.setHallLayout(hallLayout);
    }

    get seats(): LayoutState["seats"] {
        return this.layout.seats;
    }

    set seats(seats) {
        this.setSeats(seats);
    }

    get seatGroups(): LayoutState["seatGroups"] {
        return this.layout.seatGroups;
    }

    set seatGroups(seatGroups) {
        this.setSeatGroups(seatGroups);
    }

    get reserveSeats(): GroupsState["reserveSeats"] {
        return this.groups.reserveSeats;
    }

    set reserveSeats(reserveSeats) {
        this.setReserveSeats(reserveSeats);
    }

    get layoutReserveSeatsMap(): GroupsState["layoutReserveSeats"] {
        const result = new Map();
        Object.entries(this.groups.layoutReserveSeats).forEach(e => {
            JSON.parse(e[1]).forEach((s: any) => {
                if (result.has(s)) {
                    const valueArray = result.get(s).slice();
                    valueArray.push(Number(e[0]));
                    result.set(s, valueArray);
                } else {
                    result.set(s, [Number(e[0])]);
                }
            });
        });
        return result;
    }

    get getGroupsMap(): Map<number, string> {
        const result = new Map();
        this.groups.groups.forEach((e: any) => {
            result.set(
                e.id,
                "name:" +
                    `${e.group_name}` +
                    " number:" +
                    `${e.group_number}` +
                    " " +
                    `${e.start_time.substr(10, 6)}` +
                    "~" +
                    `${e.end_time.substr(10, 6)}`
            );
        });
        return result;
    }

    @Watch("hallLayout")
    onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
        return newVal;
    }

    @Watch("seats")
    setLayoutSeat(newVal: any[], oldVal: any[]): any[] {
        this.layoutSeats = newVal.slice();
        return newVal;
    }

    @Watch("seatGroups")
    setLayoutSeatGroups(newVal: any[], oldVal: any[]): any[] {
        this.layoutSeatGroups = newVal.slice();
        return newVal;
    }

    selectedBox(seat: Seat): void {
        if (this.reserveSeats.includes(seat.id)) {
            this.reserveSeats = this.reserveSeats.filter(e => e !== seat.id);
        } else {
            this.reserveSeats.push(seat.id);
        }
    }

    init() {
        this.reserveSeats = [];
    }
    //Container Setting Data
    cellSize = {
        w: 1,
        h: 1
    };
    maxColumnCount: number = 550;
    maxRowCount: number = 200;
    bubbleUp: boolean = false;
    margin: number = 2;
    boxCount: number = 4;
    //layout
    layoutSeats: LayoutState["seats"] = [];
    layoutSeatGroups: LayoutState["seatGroups"] = [];
    SEAT_TYPE_ROOM = SEAT_TYPE_ROOM;

    created() {
        // vue
    }

    mounted() {
        // vue
    }

    updated() {
        // vue
    }

    destroyed() {
        // vue
    }
}
</script>

<style></style>
