<template>
    <div>
        <button
            type="button"
            class="btn btn-secondary"
            data-toggle="tooltip"
            data-placement="top"
            title="Tooltip on top"
        >
            Tooltip on top
        </button>
        <b-card no-body>
            <b-card-body style="overflow-x: scroll;">
                <!-- b-row set width size -->
                <span class="text-danger" v-if="getGroups.length === 0"
                    >Not Found</span
                >
                <b-row style="flex-wrap: nowrap;">
                    <div
                        class="group-card"
                        v-for="groups in getGroups"
                        :key="'groups_id_' + `${groups.id}`"
                    >
                        <div
                            class="card card-stats mb-4"
                            show-footer-line="true"
                        >
                            <div
                                class="card-body"
                                :class="[
                                    {
                                        'seat-selected-color':
                                            seletedGroupId === groups.id
                                    },
                                    {
                                        'border border-danger':
                                            mouseOverId == groups.id
                                    }
                                ]"
                                @mouseover.prevent="mouseOverId = groups.id"
                                @mouseout.prevent="mouseOverId = 0"
                                @click.prevent="seletedGroupId = groups.id"
                            >
                                <div class="row">
                                    <div class="col">
                                        <h5
                                            class="card-title text-uppercase text-muted mb-0"
                                        >
                                            {{ setTimeRange(groups) }}
                                        </h5>
                                        <span
                                            class="h2 font-weight-bold mb-0"
                                            >{{ groups.group_name }}</span
                                        >
                                    </div>
                                    <div class="col-auto">
                                        <div
                                            class="icon icon-shape text-white rounded-circle shadow bg-gradient-red"
                                        >
                                            <i class="ni ni-active-40"></i>
                                        </div>
                                    </div>
                                </div>
                                <p class="mt-3 mb-0 text-sm">
                                    <span class="text-success mr-2">3.48%</span>
                                    <span class="text-nowrap">{{
                                        groups.seat
                                    }}</span>
                                </p>
                                <transition name="fade">
                                    <div v-if="seletedGroupId === groups.id">
                                        <b-button
                                            class="float-right mx-1"
                                            @click.stop.prevent="
                                                updateReserveSeats
                                            "
                                            >保存
                                        </b-button>
                                        <b-button
                                            class="float-right mx-1"
                                            @click.stop.prevent=""
                                            :disabled="
                                                !layoutReserveSeats[
                                                    String(groups.id)
                                                ]
                                            "
                                            >席リセット
                                        </b-button>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </b-row>
            </b-card-body>
        </b-card>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Getter, Mutation } from "vuex-class";
import { LayoutState, GroupsState, Groups } from "../../../store/types";

@Component
export default class ReserveGroups extends Vue {
    @State("layout") layout!: LayoutState;
    @State("groups") groups!: GroupsState;
    @Mutation("setGroupId", { namespace: "groups" }) setGroupId: any;
    @Mutation("setLayoutId", { namespace: "groups" }) setLayoutId: any;
    @Mutation("setReserveSeats", { namespace: "groups" }) setReserveSeats: any;

    get refs(): any {
        return this.$refs;
    }

    get getGroups(): GroupsState["groups"] {
        return this.groups.groups;
    }

    get reserveSeats(): GroupsState["reserveSeats"] {
        return this.groups.reserveSeats;
    }

    set reserveSeats(reserveSeats) {
        this.setReserveSeats(reserveSeats);
    }

    get seletedGroupId(): GroupsState["groupId"] {
        return this.groups.groupId;
    }

    set seletedGroupId(groupId: GroupsState["groupId"]) {
        this.setGroupId(groupId);
    }

    get layoutReserveSeats(): GroupsState["layoutReserveSeats"] {
        return this.groups.layoutReserveSeats;
    }

    setTimeRange(groups: any) {
        const date = `${groups.start_time.substr(0, 11)}`;
        const range =
            `${groups.start_time.substr(11, 5)}` +
            " ~ " +
            `${groups.end_time.substr(11, 5)}`;
        return date + range;
    }

    updateReserveSeats(): void {
        if (this.reserveSeats.length === 0)
            return alert("席を選択してください。");
        this.$store.dispatch("groups/setReserveSeats", this.groups);
    }

    mouseOverId: number = 0;

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

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
