<template>
  <div>
    <template v-if="layoutSeatsUpdateFlg">
      <b-row>
        <b-col cols="6">
          <div class="card mb-2">
            <b-button variant="info" @click.prevent="updateLayout()">レイアウト更新</b-button>
          </div>
        </b-col>
        <b-col cols="6">
          <div class="card mb-2">
            <b-button variant="info" @click.prevent>更新キャンセル</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <div class="card mb-2"></div>
        </b-col>
      </b-row>
    </template>
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
              <SeatBox
                :boxId="seat.id"
                :key="'SeatEditKey:' + seat.id"
                class="border border-danger rounded-sm p-1"
              >
                {{ seat.name }}
                <b-icon icon="arrow-down-right-circle-fill" style="width: 20px; height: 20px;"></b-icon>
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

  @Watch("layoutSeats")
  onLayoutSeatsChange(newVal: any[], oldVal: any[]): any[] {
    // テーブルの位置が変更されたら更新ボタンを表示
    newVal.forEach((e) => {
      if (
        oldVal.some(
          (o) =>
            o.id === e.id &&
            (o.position.w !== e.position.w ||
              o.position.h !== e.position.h ||
              o.position.x !== e.position.x ||
              o.position.y !== e.position.y)
        )
      ) {
        this.layoutSeatsUpdateFlg = true;
      }
    });

    return newVal;
  }

  //TODO:
  setBoxStatus(pinnedFlg: boolean) {
    this.layoutSeats.forEach((e: any) => {
      e.pinned = pinnedFlg;
    });
  }

  @Watch("seats")
  setLayoutSeat(newVal: any[], oldVal: any[]): any[] {
    this.layoutSeats = newVal;
    return newVal;
  }

  updateLayout() {
    this.setEditSeats(this.layoutSeats);
    this.$store.dispatch("layout/updateLayout", this.layout);
  }

  //Container Setting Data
  cellSize = {
    w: 1,
    h: 1,
  };
  maxColumnCount = 550;
  maxRowCount = 200;
  bubbleUp = false;
  margin = 2;
  boxCount = 4;
  //layout
  layoutSeats: any[] = [];
  layoutSeatsUpdateFlg = false;
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
