<template>
  <div>
    <transition name="fade">
      <template v-if="layoutSeatsUpdateFlg">
        <b-row>
          <b-col cols="6">
            <div class="card mb-2">
              <b-button variant="info" @click.prevent="updateLayout()">レイアウト更新</b-button>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="card mb-2">
              <b-button variant="info" @click.prevent="cancel()">修正前に戻す</b-button>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="card mb-2"></div>
          </b-col>
        </b-row>
      </template>
    </transition>
    <b-row>
      <b-col cols="12">
        <div class="card border border-primary rounded-sm" style="width:100%; height:600px;">
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
              <SeatBox :boxId="seat.id" :key="'SeatEditKey:' + seat.id">
                <div
                  class="border border-danger rounded-sm p-1 w-100 h-100"
                  :class="selectedSeatId == seat.id ? 'seat-selected-color': ''"
                  @click.prevent="selectedBox(seat)"
                  @mouseleave="boxMouseOver( $event.target, seat.type)"
                >
                  <!-- TODO: seat group name -->
                  <template v-if="seat.seatGroupId">{{ seat.name }}</template>
                  <template v-else>{{ seat.name }}</template>
                  {{ seat.count }}席
                  <div v-if="seat.type === SEAT_TYPE_ROOM" class="seat-resize-icon">
                    <b-icon icon="arrow-down-right-circle-fill" style="width: 20px; height: 20px;"></b-icon>
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
import { Seat, SeatInterface, SEAT_TYPE_ROOM } from "../../modules/layout/Seat";
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
    SeatBox: Box,
  },
})
export default class SeatMaintenanceLayout extends Vue {
  @State("layout") layout!: LayoutState;
  @Mutation("setHallLayout", { namespace }) setHallLayout: any;
  @Mutation("setSeats", { namespace }) setSeats: any;
  @Mutation("setEditSeats", { namespace }) setEditSeats: any;
  //   private layout!: Layout[];

  get hallLayout(): LayoutState["hallLayout"] {
    if (this.layout.hallLayout.length > 0) {
      this.seats = this.layout.hallLayout[0].seats;
      this.layoutSeatsUpdateFlg = false;
    }
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

  @Watch("hallLayout")
  onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
    return newVal;
  }

  @Watch("selectedSeatId")
  setSelectedSeatId(newVal: number | null, oldVal: number | null): void {
    if (newVal) {
      this.layoutSeatsUpdateFlg = true;
    } else {
      this.layoutSeatsUpdateFlg = false;
    }
  }

  @Watch("seats")
  setLayoutSeat(newVal: any[], oldVal: any[]): any[] {
    this.layoutSeats = [];
    newVal.forEach((e) => this.layoutSeats.push(e));
    return newVal;
  }

  addLayoutSeats(seat: SeatInterface): void {
    if (this.layoutSeats.some((e) => e.name === seat.name))
      return alert("卓名が重複されてます。");

    if (this.layoutSeats.some((e) => e.id === seat.id)) {
      seat.id = this.createSeatId;
      this.createSeatId--;
    }
    //TODO: 卓編集モード中しかpushできないバグ対応
    this.layoutSeatsUpdateFlg = true;
    this.layoutSeats.push(seat);
  }

  selectedBox(seat: SeatInterface): void {
    this.selectedSeatId = seat.id;
    this.layoutSeats.forEach((e: any) => {
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
    this.setEditSeats(this.layoutSeats);
    this.$store.dispatch("layout/updateLayout", this.layout);

    this.init();
  }

  cancel(): void {
    this.layoutSeats = [];
    this.seats.forEach((e) => this.layoutSeats.push(e));
  }

  init() {
    this.layoutSeatsUpdateFlg = false;
    this.selectedSeatId = null;
  }
  //Container Setting Data
  cellSize = {
    w: 1,
    h: 1,
  };
  maxColumnCount: number = 550;
  maxRowCount: number = 200;
  bubbleUp: boolean = false;
  margin: number = 2;
  boxCount: number = 4;
  //layout
  layoutSeats: LayoutState["seats"] = [];
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
