<template>
    <div>
        <transition-group name="fade" tag="div">
            <div v-if="layoutSeatsUpdateFlg" :key="'fade_key'">
                <b-row>
                    <b-col cols="4">
                        <div class="card mb-2">
                            <b-button
                                variant="info"
                                @click.prevent="updateLayout()"
                                :disabled="loading"
                                >レイアウト更新</b-button
                            >
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="card mb-2">
                            <b-button variant="info" @click.prevent="cancel()"
                                >修正前に戻す</b-button
                            >
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="card mb-2">
                            <b-button variant="info" @click.prevent="deleteSeats()"
                                >選択中のテーブル削除</b-button
                            >
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <div class="card mb-2"></div>
                    </b-col>
                </b-row>
            </div>
        </transition-group>
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
                          <!-- :key="seat.seatGroupId ? ('BoxGroupKey:' + seat.name) : ('BoxKey:' + seat.name)" -->
                            <SeatBox
                                :boxId="seat.id"
                                :key="'BoxKey:' + seat.id"
                            >
                                    <div
                                        class="table p-1 w-100 h-100"
                                        :class="{
                                            'seat-selected-color':
                                                selectedSeatId == seat.id
                                        }"
                                        @click.prevent="seat.seatGroupId ? seatsToGroupBox(seat): selectedBox(seat)"
                                        @mouseleave="
                                            boxMouseOver(
                                                $event.target,
                                                seat.type
                                            )
                                        "
                                    >
                                        <span>{{ seat.name }}</span>
                                        <span>{{ seat.count }}席</span>
                                        <div
                                            v-if="seat.type === SEAT_TYPE_ROOM"
                                            class="seat-resize-icon"
                                        >
                                            <b-icon
                                                icon="arrow-down-right-circle-fill"
                                                style="width: 20px; height: 20px;"
                                            ></b-icon>
                                        </div>
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
import { LayoutState, Layout, CommonState } from "../../store/types";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import { SeatGroup } from "../../modules/layout/SeatGroup";

@Component({
    components: {
        SeatContainer: Container,
        SeatBox: Box
    }
})
export default class SeatMaintenanceLayout extends Vue {
    @State("layout") layout!: LayoutState;
    @State("common") common!: CommonState;
    @Mutation("setHallLayout", { namespace }) setHallLayout: any;
    @Mutation("setSeats", { namespace }) setSeats: any;
    @Mutation("setSeatGroups", { namespace }) setSeatGroups: any;
    @Mutation("setEditSeats", { namespace }) setEditSeats: any;
    @Mutation("setEditSeatGroups", { namespace }) setEditSeatGroups: any;
    @Mutation("setEditSeatsMinId", { namespace }) setEditSeatsMinId: any;
    @Mutation("setEditSeatGroupsMinId", { namespace }) setEditSeatGroupsMinId: any;

    get loading(): CommonState["loading"] {
        return this.common.loading;
    }

    get hallLayout(): LayoutState["hallLayout"] {
        if (this.layout.hallLayout.length > 0) {
            this.seats = this.layout.hallLayout[0].seats.slice();
            this.seatGroups = this.layout.hallLayout[0].seat_groups.slice();
            this.layoutSeatsUpdateFlg = false;
        }
        this.init();
        return this.layout.hallLayout;
    }

    set hallLayout(hallLayout: LayoutState["hallLayout"]) {
        this.setHallLayout(hallLayout);
    }

    get seats(): LayoutState["seats"] {
        return this.layout.seats;
    }

    set seats(seats: LayoutState["seats"]) {
        this.setSeats(seats);
    }

    get seatGroups(): LayoutState["seatGroups"] {
        return this.layout.seatGroups;
    }

    set seatGroups(seatGroups:LayoutState["seatGroups"]) {
        this.setSeatGroups(seatGroups);
    }

    get editSeatsMinId(): LayoutState["editSeatsMinId"] {
        return this.layout.editSeatsMinId;
    }

    set editSeatsMinId(editSeatsMinId: LayoutState["editSeatsMinId"]) {
        this.setEditSeatsMinId(editSeatsMinId);
    }

    get editSeatGroupsMinId(): LayoutState["editSeatGroupsMinId"] {
        return this.layout.editSeatGroupsMinId;
    }

    set editSeatGroupsMinId(editSeatGroupsMinId: LayoutState["editSeatGroupsMinId"]) {
        this.setEditSeatGroupsMinId(editSeatGroupsMinId);
    }

    @Watch("hallLayout")
    onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
        return newVal;
    }

    @Watch("selectedSeatId")
    setSelectedSeatId(newVal: number | null, oldVal: number | null): void {
        if (newVal != null) {
            this.layoutSeatsUpdateFlg = true;
        } else {
            this.layoutSeatsUpdateFlg = false;
        }
    }

    @Watch("seats")
    setLayoutSeats(newVal: any[], oldVal: any[]): any[] {
        this.layoutSeats = newVal.slice();
        return newVal;
    }

    @Watch("seatGroups")
    setLayoutSeatGroups(newVal: any[], oldVal: any[]): any[] {
        this.layoutSeatGroups = newVal.slice();
        return newVal;
    }

    @Watch("layoutSeats")
    editSeatsWatch(newVal: any[], oldVal: any[]): any[] {
        this.editSeatsMinId = this.getMinId(this.layoutSeats);
        return newVal;
    }

    @Watch("layoutSeatGroups")
    editSeatGroupsWatch(newVal: any[], oldVal: any[]): any[] {
        this.editSeatGroupsMinId = this.getMinId(this.layoutSeatGroups);
        return newVal;
    }

    getMinId(array: any[]):number{
      if(array.length === 0) return 0
      const minSeat = array.reduce((a:any, b:any) => {
        if(a.id < b.id){
          return a;
        }else{
          return b;
        }
      })
      return minSeat.id < 0 ? minSeat.id -1 : -1;
    }

    addLayoutSeats(seat: Seat): void {
        if (this.layoutSeats.some(e => e.name === seat.name))
            return alert("卓名が重複されてます。");

        this.layoutSeatsUpdateFlg = true;
        this.layoutSeats.push(seat);
        this.createdSeats.push(seat);
    }

    addLayoutSeatGroups(seatGroups: SeatGroup): void {
        if (this.layoutSeatGroups.some(e => e.name === seatGroups.seat_group_name))
            return alert("卓名が重複されてます。");

        this.layoutSeatsUpdateFlg = true;
        this.layoutSeatGroups.push(seatGroups);
    }

    seatsToGroupBox(seat: Seat): void {
      if(seat.isChange) return
      this.groupToSeatBox()

      const targetGroup = this.layoutSeats.filter(e => e.seatGroupId === seat.seatGroupId)
      // レイアウト上のseats削除
      this.layoutSeats = this.layoutSeats.filter(e => e.seatGroupId !== seat.seatGroupId)
      const minIdSeat = targetGroup.reduce((a:Seat, b:Seat) => { return a.id < b.id ? a : b })
      // レイアウト上のgroupサイズの卓追加
      const xSeat = targetGroup.reduce((a:Seat, b:Seat) => {
        if(a.position.x === b.position.x){
          if(a.position.y < b.position.y){
            return a;
          }else{
            return b;
          }
        }else{
          if(a.position.x < b.position.x){
            return a;
          }else{
            return b;
          }
        }
      })

      const ySeat = targetGroup.reduce((a:Seat, b:Seat) => {
        if(a.position.x === b.position.x){
          if(a.position.y > b.position.y){
            return a;
          }else{
            return b;
          }
        }else{
          if(a.position.x > b.position.x){
            return a;
          }else{
            return b;
          }
        }
      })

      const id = minIdSeat.id - 1 < 1 ? minIdSeat.id - 1 : 0
      const w = xSeat.position.x === ySeat.position.x ? xSeat.position.w : (targetGroup.length * xSeat.position.w)
      const h = xSeat.position.y === ySeat.position.y ? xSeat.position.h : (targetGroup.length * xSeat.position.h)
      const targetSeatGroup = this.layoutSeatGroups.filter(e => e.id === seat.seatGroupId)[0];

      const group = new Seat ({
            id,
            name:targetSeatGroup.seat_group_name,
            seat_group_id: seat.seatGroupId,
            count: xSeat.count,
            type: xSeat.seatType,
            x:xSeat.position.x,
            y:xSeat.position.y,
            w,
            h,
            isChange:true
          });
      //グループテーブルをプッシュ
      this.layoutSeats.push(group);
      this.selectedBox(group, true);
    }

    groupToSeatBox(){
      const changeTargetGroup = this.layoutSeats.filter(e => e.isChange)
      if (changeTargetGroup.length === 0) return 

      let isXtype = true;
      
      let beforeSeats = this.seats.filter(e => e.seatGroupId === changeTargetGroup[0].seatGroupId)
      if(changeTargetGroup[0].seatGroupId < 1){
        beforeSeats = this.createdSeats.filter(e => e.seatGroupId === changeTargetGroup[0].seatGroupId)
      }
      
      beforeSeats.sort((a:any, b:any) => {
          if(a.position.x === b.position.x){
            isXtype = false
            if(a.position.y < b.position.y){
              return a
            }else{
              return b
            }
          }else{
            if(a.position.x < b.position.x){
              return a
            }else{
              return b
            }
          }
      })

        let xValue = changeTargetGroup[0].position.x
        let yValue = changeTargetGroup[0].position.y

        for(let i=0; i < beforeSeats.length; i++){
          const after = new Seat ({
            id:beforeSeats[i].id,
            name:beforeSeats[i].name,
            seat_group_id: changeTargetGroup[0].seatGroupId,
            count: beforeSeats[i].count,
            type: beforeSeats[i].type,
            x:xValue,
            y:yValue,
            w:beforeSeats[i].position.w,
            h:beforeSeats[i].position.h,
            isChange:false
          });
          //グループテーブルをプッシュ
          this.layoutSeats.push(after);

          if(isXtype){
            xValue = xValue + beforeSeats[i].position.w
          }else{
            yValue = yValue + beforeSeats[i].position.h
          }
        }


      this.layoutSeats = this.layoutSeats.filter(e => e.id !== changeTargetGroup[0].id);

      // changeSeats.forEach(e => this.layoutSeats.push(e));
    }  

    selectedBox(seat: Seat, isGroupBoxClick = false): void {
      if(!isGroupBoxClick){
        this.groupToSeatBox()
      }
      
      this.selectedSeatId = seat.id;
      this.layoutSeats.forEach((e: Seat) => {
          if (seat.id === e.id) {
             e.pinned = false;
          } else {
             e.pinned = true;
          }
      });
    }

    boxMouseOver(target: HTMLElement, seatType: number): void {
        // 個室のみリサイズ可能
        if (seatType !== SEAT_TYPE_ROOM) {
            const parent: ParentNode | null = <Element>target.parentNode;
            const children: HTMLCollection = parent.children;
            for (var i = 0; i < children.length; i++) {
                children[i].classList.remove("resize-handle");
            }
        }
    }

    updateLayout(): void {
      this.groupToSeatBox()
      this.setEditSeats(this.layoutSeats);
      this.setEditSeatGroups(this.layoutSeatGroups);
      this.$store.dispatch("layout/updateLayout", this.layout);

      this.init();
    }

    cancel(): void {
      this.groupToSeatBox()
      this.layoutSeats = this.seats.slice();
      this.layoutSeatGroups = this.seatGroups.slice();
      this.createdSeats = []
    }

    deleteSeats(): void {
      const selectedSeat = this.layoutSeats.filter(e => this.selectedSeatId !== e.id)
      this.groupToSeatBox()

      if(selectedSeat[0].isChange && selectedSeat[0].seatGroupId !== undefined){
        this.layoutSeatGroups = this.layoutSeatGroups.filter(e => e.seatGroupId !== selectedSeat[0].seatGroupId)
      }else{

      }
      
      this.layoutSeats = this.layoutSeats.filter(e => this.selectedSeatId !== e.id)

    }

    init() {
        this.layoutSeatsUpdateFlg = false;
        this.selectedSeatId = null;
        this.createdSeats = []
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
    createdSeats: LayoutState["seats"] = [];
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
