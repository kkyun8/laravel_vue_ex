<template>
  <div>
    <b-row>
      <b-col cols="12"></b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="card">
          <SeatContainer
            class="border border-primary rounded-sm"
            :layout.sync="layoutSeats"
            :cellSize="cellSize"
            :maxColumnCount="maxColumnCount"
            :maxRowCount="maxRowCount"
            :margin="margin"
            :bubbleUp="bubbleUp"
          >
            <SeatBox :boxId="1" class="border border-danger rounded-sm p-1">testa</SeatBox>
            <SeatBox :boxId="2" class="border border-danger rounded-sm p-1">testb</SeatBox>
          </SeatContainer>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
const namespace: string = "layout";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({
  components: {
    SeatContainer: Container,
    SeatBox: Box
  }
})
export default class Index extends Vue {
  @State("layout") layout!: LayoutState;
  @Mutation("setHallLayout", { namespace }) setHallLayout: any;
  // @Getter('fullName', { namespace }) fullName: string;
  //   private layout!: Layout[];

  get hallLayout(): LayoutState["hallLayout"] {
    return this.layout.hallLayout;
  }

  set hallLayout(hallLayout) {
    this.setHallLayout(hallLayout);
  }

  @Watch("hallLayout")
  onHallLayoutChange(newVal: any[], oldVal: any[]): any[] {
    return newVal;
  }

  //Container Setting Data
  cellSize = {
    w: 1,
    h: 1
  };
  maxColumnCount = 600;
  maxRowCount = 200;
  bubbleUp = false;
  margin = 2;
  boxCount = 4;
  layoutSeats = [
    {
      id: 1,
      hidden: false,
      pinned: false,
      position: {
        x: 0,
        y: 0,
        w: 20,
        h: 30
      }
    },
    {
      id: 2,
      hidden: false,
      pinned: false,
      position: {
        x: 40,
        y: 40,
        w: 30,
        h: 20
      }
    }
  ];
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
