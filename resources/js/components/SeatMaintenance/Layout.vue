<template>
    <div>
        <b-row>
            <b-col cols="12"></b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div
                    class="card border border-primary rounded-sm"
                    style="width:100%; height:600px;"
                >
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
                                class="border border-danger rounded-sm p-1"
                                >{{ seat.name }}
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
import { Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({
    components: {
        SeatContainer: Container,
        SeatBox: Box
    }
})
export default class Index extends Vue {
    @State("layout") layout!: LayoutState;
    @Mutation("setHallLayout", { namespace }) setHallLayout: any;
    @Mutation("setSeats", { namespace }) setSeats: any;
    @Mutation("setEditSeats", { namespace }) setEditSeats: any;
    //   private layout!: Layout[];

    get hallLayout(): LayoutState["hallLayout"] {
        if (this.layout.hallLayout.length > 0) {
            this.setSeats(this.layout.hallLayout[0].seats);
            this.setEditSeats(this.layout.hallLayout[0].seats);
        }
        return this.layout.hallLayout;
    }

    set hallLayout(hallLayout) {
        this.setHallLayout(hallLayout);
    }

    get editSeats(): LayoutState["editSeats"] {
        return this.layout.editSeats;
    }

    set editSeats(seats) {
        this.setEditSeats(seats);
    }

    @Watch("hallLayout")
    onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
        return newVal;
    }

    //Container Setting Data
    cellSize = {
        w: 1,
        h: 1
    };
    maxColumnCount = 400;
    maxRowCount = 200;
    bubbleUp = false;
    margin = 2;
    boxCount = 4;
    //layout
    // layoutSeats = [];
    layoutSeats = [
        {
            id: 1,
            hidden: false,
            pinned: false,
            position: {
                x: 0,
                y: 0,
                w: 20,
                h: 30
            }
        },
        {
            id: 2,
            hidden: false,
            pinned: false,
            position: {
                x: 40,
                y: 40,
                w: 30,
                h: 20
            }
        }
    ];

    updateSeats = [];

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
