<template>
    <div>
        <b-card no-body>
            <b-card-body style="overflow-x: scroll;">
                <!-- b-row set width size -->
                <span class="text-danger" v-if="getGroups.length === 0"
                    >Not Found</span
                >
                <b-row style="flex-wrap: nowrap;">
                    <div
                        class="group-card"
                        v-for="group in getGroups"
                        :key="`group_id_${group.id}`"
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
                                            seletedGroupId === group.id
                                    },
                                    {
                                        'border border-danger':
                                            mouseOverId == group.id
                                    }
                                ]"
                                @mouseover.prevent="mouseOverId = group.id"
                                @mouseout.prevent="mouseOverId = 0"
                                @click.prevent="seleteGroup(group)"
                            >
                                <div class="row">
                                    <div class="col">
                                        <h5
                                            class="card-title text-uppercase text-muted mb-0"
                                        >
                                            {{ setTimeRange(group) }}
                                        </h5>
                                        <span
                                            class="h2 font-weight-bold mb-0"
                                            >{{ group.group_name }}</span
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
                                    <span class="text-success mr-2">{{getSeatName(layoutReserveSeats[group.id])}}</span>
                                    <span class="text-nowrap">{{
                                        group.seat
                                    }}</span>
                                </p>
                                <transition name="fade">
                                    <div v-if="seletedGroupId === group.id">
                                        <b-button
                                            class="float-right mx-1"
                                            @click.stop.prevent="updateReserveSeats"
                                            :disabled="loading"
                                            >保存
                                        </b-button>
                                        <b-button
                                            class="float-right mx-1"
                                            @click.stop.prevent="resetSeats"
                                            :disabled="loading ? loading : !layoutReserveSeats[group.id]"
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
import { CommonState, LayoutState, GroupsState, Groups } from "../../../store/types";
import * as moment from "moment";

@Component
export default class ReserveGroups extends Vue {
    @State("layout") layout!: LayoutState;
    @State("groups") groups!: GroupsState;
    @State("common") common!: CommonState;
    @Mutation("setGroupId", { namespace: "groups" }) setGroupId: any;
    @Mutation("setLayoutId", { namespace: "groups" }) setLayoutId: any;
    @Mutation("setReserveSeats", { namespace: "groups" }) setReserveSeats: any;
    @Mutation("resetReserveSeats", { namespace: "groups" }) resetReserveSeats: any;
    @Mutation("setWarning", { namespace: "common" }) setWarning: any;

    get refs(): any {
        return this.$refs;
    }

    get loading(): CommonState["loading"] {
        return this.common.loading;
    }

    get getGroups(): GroupsState["groups"] {
        return this.groups.groups;
    }

    get seats(): LayoutState["seats"] {
        return this.layout.seats;
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

    // get warning(): CommonState["warning"] {
    //     return this.common.warning;
    // }

    // set warning(warning) {
    //     this.setWarning(warning);
    // }

    seleteGroup(group: any) {
      this.seletedGroupId = group.id;
      this.reserveSeats = []

      if(!this.layoutReserveSeats[group.id]) return 

      const seatIds:number[] = JSON.parse(this.layoutReserveSeats[group.id]);
      this.reserveSeats = seatIds.slice()
    }

    setTimeRange(groups: any) {
        const date = `${groups.start_time.substr(0, 11)}`;
        const range = `${groups.start_time.substr(11, 5)} ~ ${groups.end_time.substr(11, 5)}`;
        return date + range;
    }

    updateReserveSeats(): void {
        if (this.reserveSeats.length === 0)
            return alert("席を選択してください。");
        if(this.checkTimeLine()) return

        this.$store.dispatch("groups/setReserveSeats", this.groups);
    }

    resetSeats(): void {
        this.reserveSeats = []
        this.$store.dispatch("groups/resetReserveSeats", this.groups);
    }

    getSeatName(jsonArray:string){
      if(!jsonArray) return ''

      const seatIds = JSON.parse(jsonArray);
      return this.seats.filter(e => seatIds.includes(e.id)).map(e => e.name).join(" ")
    }

    checkTimeLine():boolean {
      const seleteGroup = this.groups.groups.filter(e => e.id === this.seletedGroupId)[0]
      const startTime = moment(seleteGroup.start_time) 
      const endTime = moment(seleteGroup.end_time) 
      const seleteSeats = this.groups.reserveSeats.slice()

      const duplicateGroups:any[] = []
      const duplicateSeatIds = []
      
      const duplicate = Object.entries(this.groups.layoutReserveSeats).forEach(e => {
        const [ groupId, seatId] = e;
        const seatIds = JSON.parse(seatId)
        
        seleteSeats.forEach((s:any) => { 
          if(seatIds.includes(s)){
            duplicateSeatIds.push(s)
          }  
        })
        
        if(duplicateSeatIds.length){
          const groupData = this.groups.groups.filter(g => g.id === Number(groupId))[0]

          const targetStart = moment(groupData.start_time)
          const targetEnd = moment(groupData.end_time)

          const result = targetStart.isBetween(startTime, endTime) || targetEnd.isBetween(startTime, endTime)
          || startTime.isBetween(targetStart, targetEnd) || endTime.isBetween(targetStart, targetEnd)
          || (targetStart.isSame(startTime) && targetEnd.isSame(endTime))

          if(result){
            duplicateGroups.push(groupData)
          }
        }
      });

      if(duplicateGroups.length){
        const duplicateGroupsInfo =  duplicateGroups.map((m:any) =>{ return `name: ${m.group_name} ${m.start_time.substr(10, 6)} ~ ${m.start_time.substr(10, 6)}`}).join("\n")
        const msg = `予約時間・席が重複されてます。\n${duplicateGroupsInfo}`
        this.setWarning(msg);
        return true 
      }

      return false
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
