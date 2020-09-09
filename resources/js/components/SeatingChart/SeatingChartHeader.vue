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
                <div role="group" class="form-row form-group pl-2 col-md-4">
                    <label for="date" class="col-5 col-form-label">Date</label>
                    <div class="bv-no-focus-ring col">
                        <b-form-datepicker
                            id="date"
                            v-model="date"
                            class="mb-2"
                        ></b-form-datepicker>
                    </div>
                </div>
            </b-form-row>
        </div>
        <!-- TODO: -->
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout, GroupsState, Groups } from "../../store/types";
const namespace: string = "layout";
const groups: string = "groups";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({})
export default class SeatingChartHeader extends Vue {
    @State("layout") layout!: LayoutState;
    @State("groups") groups!: GroupsState;
    @Action("fetchHalls", { namespace }) fetchHalls: any;
    @Action("fetchHallLayout", { namespace }) fetchHallLayout: any;
    @Action("fetchGroups", { namespace: "groups" }) fetchGroups: any;
    @Action("fetchActiveLayouts", { namespace }) fetchActiveLayouts: any;
    @Mutation("setHallId", { namespace }) setHallId: any;
    @Mutation("setLayoutId", { namespace }) setLayoutId: any;
    @Mutation("setDate", { namespace: "groups" }) setDate: any;

    get hallId(): LayoutState["hallId"] {
        const hall = this.layout.halls.filter(
            e => e.id === this.layout.hallId
        )[0];
        if (hall) {
            this.layoutId = hall.layout_id;
        }

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
    get date(): GroupsState["date"] {
        if (!this.groups) return "";
        this.$store.dispatch("groups/fetchGroups", this.groups.date);
        return this.groups.date;
    }
    set date(date) {
        this.setDate(date);
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

    created() {
        // vue
        this.$store.dispatch("layout/fetchActiveLayouts");
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
