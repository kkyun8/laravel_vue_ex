<template>
    <div>
        <ActiveLayoutModal />
        <div
            class="card p-3 mb-2"
            style="
                background: linear-gradient(87deg, #0e0a48, #5e8cd2) !important;
            "
        >
            <h3 class="text-white">Select Hall</h3>
            <b-form-row>
                <b-form-group
                    id="select-hall-label"
                    class="pl-5 pr-3 col-md-4"
                    label-cols="2"
                    label="Hall"
                    label-for="select-hall"
                    label-class="text-white"
                >
                    <b-form-select
                        id="select-hall"
                        v-model="hallId"
                        :options="hallOptions"
                    />
                </b-form-group>
                <b-form-group
                    id="select-hall-layout-label"
                    class="pl-2 col-md-4"
                    label-cols="3"
                    label="Hall Layout"
                    label-for="select-hall-layout"
                    label-class="text-white"
                >
                    <b-form-select
                        id="hall-layout"
                        v-model="layoutId"
                        label-field="Layout"
                        :options="layoutOptions"
                    />
                </b-form-group>
                <b-form-group class="pl-2 col-md-4">
                    <b-button v-b-modal.active-layout-modal variant="light">
                        Set Active Layout
                    </b-button>
                </b-form-group>
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
const namespace = "layout";
// @ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";
import ActiveLayoutModal from "./ActiveLayoutModal.vue";

@Component({
    components: {
        ActiveLayoutModal,
    },
})
export default class SeatMaintenanceHeader extends Vue {
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
    get activeLayoutIds(): LayoutState["activeLayoutIds"] {
        return this.layout.activeLayoutIds;
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
                    this.layout.halls[h].hall_name,
            };
            hallOptions.push(hallObject);
        }
        return hallOptions;
    }

    get layoutOptions() {
        const layoutOptions: any[] = [];
        if (this.hallId !== 0) {
            const hall = this.layout.halls.filter((e) => e.id === this.hallId);
            let setLayoutIdFlg = hall[0].layouts.some(
                (s: any) => s.id === this.layoutId
            );
            for (var l in hall[0].layouts) {
                if (!setLayoutIdFlg) {
                    setLayoutIdFlg = true;
                    this.layoutId = hall[0].layouts[l].id;
                }
                let layoutObject: { value: number; text: string } = {
                    value: hall[0].layouts[l].id,
                    text: `${hall[0].layouts[l].layout_code}" "${hall[0].layouts[l].layout_name}`,
                };

                layoutOptions.push(layoutObject);
            }
        }

        const result = layoutOptions.map((e: any) => {
            if (this.activeLayoutIds[this.hallId] === e.value) {
                return { value: e.value, text: `【Active】 ${e.text}` };
            } else {
                return e;
            }
        });

        return result;
    }

    created() {
        // vue
        this.$store.dispatch("layout/fetchHalls");
        this.$store.dispatch("layout/fetchActiveLayoutIds");
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
