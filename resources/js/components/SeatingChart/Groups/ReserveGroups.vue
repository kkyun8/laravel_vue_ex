<template>
    <div>
        <b-card no-body>
            <b-card-body style="overflow-x: scroll;">
                <!-- b-row set width size -->
                <span class="text-danger" v-if="reserveGroups.length === 0"
                    >Not Found</span
                >
                <b-row style="flex-wrap: nowrap;">
                    <div
                        class="group-card"
                        v-for="groups in reserveGroups"
                        :key="'groups_id_' + `${groups.id}`"
                    >
                        <div
                            class="card card-stats mb-4"
                            show-footer-line="true"
                        >
                            <div class="card-body" @click.prevent="seletedGroupId = groups.id">
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
                            </div>
                        </div>
                    </div>
                </b-row>
            </b-card-body>
        </b-card>
    </div>
</template>
<script lang="ts">
const namespace: string = "groups";
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Getter, Mutation } from "vuex-class";
import { GroupsState, Groups } from "../../../store/types";

@Component({
    components: {}
})
export default class SeatingChartIndex extends Vue {
    @State("groups") groups!: GroupsState;
    @Mutation("setGroupId", { namespace }) setGroupId: any;

    get refs(): any {
        return this.$refs;
    }

    get reserveGroups(): GroupsState["groups"] {
        return this.groups.groups;
    }

    get seletedGroupId(): GroupsState["groupId"] {
        return this.groups.groupId;
    }

    set seletedGroupId(groupId: GroupsState["groupId"]) {
        this.setGroupId(groupId);
    }

    setTimeRange(groups: any) {
        const date = `${groups.start_time.substr(0, 11)}`;
        const range =
            `${groups.start_time.substr(11, 5)}` +
            " ~ " +
            `${groups.end_time.substr(11, 5)}`;
        return date + range;
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
    }
}
</script>

<style></style>
