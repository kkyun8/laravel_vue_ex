<template>
    <div>
        <b-row>
            <b-col cols="12">
                <div class="card" style="width:100%; height:600px;">
                    <!-- layoutSeats editSeats-->
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
                                :key="'SeatEditKey:' + seat.id"
                            >
                                    <div
                                        class="table p-1 w-100 h-100"
                                        :class="{
                                            'seat-selected-color':
                                                selectedSeatId == seat.id
                                        }"
                                        @click.prevent="selectedBox(seat)"
                                    >
                                        <!-- @mouseleave="boxMouseOver( $event.target, seat.type)" -->
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
const namespace: string = "layout";
import { Seat, SEAT_TYPE_ROOM } from "../../modules/layout/Seat";
import { Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";

@Component({
    components: {
        SeatContainer: Container,
        SeatBox: Box
    }
})
export default class SeatingChartLayout extends Vue {
    @State("layout") layout!: LayoutState;
    @Mutation("setHallLayout", { namespace }) setHallLayout: any;
    @Mutation("setSeats", { namespace }) setSeats: any;
    @Mutation("setSeatGroups", { namespace }) setSeatGroups: any;
    @Mutation("setEditSeats", { namespace }) setEditSeats: any;
    @Mutation("setEditSeatGroups", { namespace }) setEditSeatGroups: any;
    //   private layout!: Layout[];

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

    @Watch("hallLayout")
    onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
        return newVal;
    }

    @Watch("selectedSeatId")
    setSelectedSeatId(newVal: number | null, oldVal: number | null): void {}

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
        this.selectedSeatId = seat.id;
    }

    updateLayout(): void {
        this.setEditSeats(this.layoutSeats);
        this.$store.dispatch("layout/updateLayout", this.layout);

        this.init();
    }

    cancel(): void {
        this.layoutSeats = [];
        this.seats.forEach(e => this.layoutSeats.push(e));
    }

    init() {
        this.layoutSeatsUpdateFlg = false;
        this.selectedSeatId = null;
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
    layoutSeatsUpdateFlg: boolean = false;
    updateSeats: LayoutState["seats"] = [];
    createSeatId: number = -1;
    selectedSeatId: number | null = null;
    SEAT_TYPE_ROOM = SEAT_TYPE_ROOM;

    layoutConversion() {}

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
