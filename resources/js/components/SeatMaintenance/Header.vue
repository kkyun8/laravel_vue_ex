<template>
    <div>
        <div class="card p-3 mb-2">
            <h3>Select Hall</h3>
            <b-form-row>
                <b-form-group
                    id="select-hall-label"
                    class="pl-2 col-md-4"
                    label-cols="5"
                    label="Hall"
                    label-for="select-hall"
                >
                    <b-form-select
                        id="select-hall"
                        v-model="hallId"
                        :options="hallOptions"
                    ></b-form-select>
                </b-form-group>
                <b-form-group
                    id="select-hall-layout-label"
                    class="pl-2 col-md-4"
                    label-cols="5"
                    label="Hall Layout"
                    label-for="select-hall-layout"
                >
                    <b-form-select
                        id="hall-layout"
                        label-field="Layout"
                        v-model="layoutId"
                        :options="layoutOptions"
                    ></b-form-select>
                </b-form-group>
            </b-form-row>
        </div>

        <div class="card p-3 mb-2">
            <h4>Insert Seat</h4>
            <b-form-row>
                <b-form-group class="col-md-3" label="Seat Group Number Count">
                    <b-form-select
                        id="seat-group-number-input"
                        v-model="seatGroupNumber"
                        :options="seatGroupNumberOptions"
                    ></b-form-select>
                </b-form-group>
                <b-form-group class="col-md-3" label="Type">
                    <b-form-radio-group
                        id="seat-type"
                        v-model="seatType"
                        :options="seatTypeOptions"
                        name="seat-type"
                    ></b-form-radio-group>
                </b-form-group>
                <b-form-group class="col-md-3" label="Direction">
                    <b-form-radio-group
                        id="seat-direction"
                        v-model="seatDirection"
                        :options="seatDirectionOptions"
                        name="seat-direction"
                    ></b-form-radio-group>
                </b-form-group>
                <b-form-group class="col-md-3" label="Arrangement">
                    <b-form-radio-group
                        id="seat-arrangement"
                        v-model="seatArrangement"
                        :options="seatArrangementOptions"
                        name="seat-arrangement"
                    ></b-form-radio-group>
                </b-form-group>
            </b-form-row>

            <b-form-row>
                <template v-for="(n, nidx) in seatGroupNumber">
                    <b-form-group
                        class="col-md-2"
                        id="seat--number"
                        label="Seat Group Number"
                        :label-for="'seat-number-input' + nidx"
                        description="select number"
                        :key="'seat-number-' + nidx"
                    >
                        <b-form-input
                            :id="'seat-group-number-input' + nidx"
                            :value="nidx + 1"
                            :disabled="true"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="col-md-4"
                        :id="'seat-name-' + nidx"
                        description="set seat name."
                        label="Seat Name"
                        :label-for="'seat-name-input' + nidx"
                        :invalid-feedback="
                            inputSeatName.length >= 4
                                ? ''
                                : 'Enter at least 4 characters'
                        "
                        :key="'seat-name-' + nidx"
                        :state="inputSeatName.length >= 4 ? true : false"
                    >
                        <b-form-input
                            :id="'seat-name-input' + nidx"
                            v-model="inputSeatName"
                            :state="inputSeatName !== ''"
                            :type="'text'"
                            trim
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="col-md-2"
                        id="seat-count"
                        label="Seat Head Count"
                        :label-for="'seat-count-input' + nidx"
                        :key="'seat-count-' + nidx"
                    >
                        <b-form-input
                            :id="'seat-count-input' + nidx"
                            v-model="inputSeatCount"
                            :type="'number'"
                            trim
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        v-if="nidx === 0"
                        class="col-md-4"
                        id="seat-group-name"
                        label="Seat Group Name"
                        label-for="seat-group-name-input"
                        :invalid-feedback="
                            nidx > 0
                                ? inputSeatGroupName.length >= 4
                                    ? ''
                                    : 'Enter at least 4 characters'
                                : ''
                        "
                        :key="'seat-group-name-' + nidx"
                        :state="
                            nidx > 0
                                ? inputSeatGroupName.length >= 4
                                    ? true
                                    : false
                                : true
                        "
                    >
                        <b-form-input
                            id="seat-group-name-input"
                            v-model="inputSeatGroupName"
                            :state="inputSeatGroupName !== ''"
                            :type="'text'"
                            :disabled="nidx === 0"
                            trim
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        v-else
                        :key="'seat-group-name-' + nidx"
                        class="col-md-4"
                    ></b-form-group>
                </template>
            </b-form-row>
        </div>
        <!-- TODO: -->
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
const namespace: string = "layout";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({})
export default class Index extends Vue {
    @State("layout") layout!: LayoutState;
    @Action("fetchHalls", { namespace }) fetchHalls: any;
    @Action("fetchHallLayout", { namespace }) fetchHallLayout: any;
    @Mutation("setHallId", { namespace }) setHallId: any;
    @Mutation("setLayoutId", { namespace }) setLayoutId: any;

    get hallId(): LayoutState["hallId"] {
        return this.layout.hallId;
    }
    set hallId(hallId) {
        this.setHallId(hallId);
    }
    get layoutId(): LayoutState["layoutId"] {
        return this.layout.layoutId;
    }
    set layoutId(layoutId) {
        this.setLayoutId(layoutId);
        this.$store.dispatch("layout/fetchHallLayout", layoutId);
    }

    get hallOptions() {
        const hallOptions: any[] = [];
        for (var h in this.layout.halls) {
            if (this.hallId === 0) {
                this.hallId = this.layout.halls[h].id;
            }
            let hallObject: { value: number; text: string } = {
                value: this.layout.halls[h].id,
                text:
                    this.layout.halls[h].hall_code +
                    " " +
                    this.layout.halls[h].hall_name
            };
            hallOptions.push(hallObject);
        }
        return hallOptions;
    }

    get layoutOptions() {
        const layoutOptions: any[] = [];
        if (this.hallId !== 0) {
            const hall = this.layout.halls.filter(e => e.id === this.hallId);
            let setLayoutIdFlg = hall[0].layouts.some(
                (s:any) => s.id === this.layoutId
            );
            for (var l in hall[0].layouts) {
                if (!setLayoutIdFlg) {
                    setLayoutIdFlg = true;
                    this.layoutId = hall[0].layouts[l].id;
                }
                let layoutObject: { value: number; text: string } = {
                    value: hall[0].layouts[l].id,
                    text:
                        hall[0].layouts[l].layout_code +
                        " " +
                        hall[0].layouts[l].layout_name
                };

                layoutOptions.push(layoutObject);
            }
        }
        return layoutOptions;
    }

    //data
    inputSeatName = "";
    inputSeatCount = 1;
    inputSeatGroupName = "";
    seatGroupNumber = 1;
    seatGroupNumberOptions = [
        { value: 1, text: "1" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" }
    ];
    seatDirection = 0;
    seatDirectionOptions = [
        { value: 0, text: "横長" },
        { value: 1, text: "縦長" }
    ];
    seatArrangement = 0;
    seatArrangementOptions = [
        { value: 0, text: "横並び" },
        { value: 1, text: "縦並び" }
    ];
    seatType = 0;
    seatTypeOptions = [
        { value: 0, text: "ホール席" },
        { value: 1, text: "個室" }
    ];

    created() {
        // vue
        this.$store.dispatch("layout/fetchHalls");
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
