<template>
    <b-modal
        id="active-layout-modal"
        hide-backdrop
        title="activeLayoutDate"
        @ok="handleOk"
    >
        <b-col>
            <b-form-input
                id="example-input"
                v-model="activeLayoutDate[0]"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
            />
            <b-input-group-append>
                <b-form-datepicker
                    v-model="activeLayoutDate[0]"
                    button-only
                    right
                    locale="jp"
                    aria-controls="example-input"
                />
            </b-input-group-append>
        </b-col>
        <b-col>
            <b-form-input
                id="example-input"
                v-model="activeLayoutDate[1]"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
            />
            <b-input-group-append>
                <b-form-datepicker
                    v-model="activeLayoutDate[1]"
                    button-only
                    right
                    locale="jp"
                    aria-controls="example-input"
                />
            </b-input-group-append>
        </b-col>
    </b-modal>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
const namespace = "layout";
import mutations from "../../store/layout/mutations";
import * as moment from "moment";

@Component
export default class ActiveLayoutModal extends Vue {
    @State("layout") layout!: LayoutState;
    @Action("fetchHalls", { namespace }) fetchHalls: any;
    @Action("fetchHallLayout", { namespace }) fetchHallLayout: any;
    @Mutation("setHallId", { namespace }) setHallId: any;
    @Mutation("setLayoutId", { namespace }) setLayoutId: any;
    @Mutation("setActiveLayoutId", { namespace }) setActiveLayoutId: any;
    @Mutation("setActiveStartTime", { namespace }) setActiveStartTime: any;
    @Mutation("setActiveEndTime", { namespace }) setActiveEndTime: any;

    get hallId(): LayoutState["hallId"] {
        return this.layout.hallId;
    }

    get layoutId(): LayoutState["layoutId"] {
        return this.layout.layoutId;
    }

    get halls(): LayoutState["halls"] {
        return this.layout.halls;
    }

    get hallLayout(): LayoutState["hallLayout"] {
        return this.layout.hallLayout;
    }

    get activeLayoutIds(): LayoutState["activeLayoutIds"] {
        return this.layout.activeLayoutIds;
    }

    get activeLayoutId(): LayoutState["activeLayoutId"] {
        return this.layout.activeLayoutId;
    }

    set activeLayoutId(activeLayoutId) {
        this.setActiveLayoutId(activeLayoutId);
    }

    get activeStartTime(): LayoutState["activeStartTime"] {
        return this.layout.activeStartTime;
    }

    set activeStartTime(activeStartTime) {
        this.setActiveStartTime(activeStartTime);
    }

    get activeEndTime(): LayoutState["activeEndTime"] {
        return this.layout.activeEndTime;
    }

    set activeEndTime(activeEndTime) {
        this.setActiveEndTime(activeEndTime);
    }

    activeLayoutDate = [
        moment().format("YYYY-MM-DD"),
        moment().add(1, "months").format("YYYY-MM-DD"),
    ];

    handleOk() {
        this.activeLayoutId = this.layoutId;
        this.activeStartTime = this.activeLayoutDate[0];
        this.activeEndTime = this.activeLayoutDate[1];
        this.$store.dispatch("layout/updateActiveLayout", this.layout);
    }

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
        this.activeLayoutId = 0;
        this.activeStartTime = "";
        this.activeEndTime = "";
    }
}
</script>

<style></style>
