<template>
  <div>
    <h3>Layout Header</h3>
    <b-row class="py-2">
      <b-col cols="6">
        <b-form-select label-field="Hall" v-model="hallId" :options="hallOptions"></b-form-select>
      </b-col>
      <b-col cols="6">
        <b-form-select label-field="Layout" v-model="layoutId" :options="layoutOptions"></b-form-select>
      </b-col>
    </b-row>
    <div class="card p-3 mb-2">
      <!-- TODO: 配列？ -->
      <b-row>
        <b-form-group>
          <h4>Insert Seat</h4>
        </b-form-group>
        <b-form-group
          label-cols="6"
          label="Seat Group Number Count"
          label-for="seat-group-number-input"
        >
          <b-form-select
            id="seat-group-number-input"
            v-model="seatGroupNumber"
            :options="seatGroupNumberOptions"
          ></b-form-select>
        </b-form-group>
      </b-row>

      <div class="form-row">
        <template v-for="(n, nidx) in seatGroupNumber">
          <b-form-group
            class="col-md-2"
            id="seat--number"
            label="Seat Group Number"
            :label-for="'seat-number-input' + nidx"
            description="select number"
            :key="'seat-number-' + nidx"
          >
            <b-form-input :id="'seat-group-number-input' + nidx" :value="nidx + 1" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group
            class="col-md-4"
            :id="'seat-name-' + nidx"
            description="set seat name."
            label="Seat Name"
            :label-for="'seat-name-input' + nidx"
            :invalid-feedback="
                            inputSeatName.length >= 4
                                ? ''
                                : 'Enter at least 4 characters'
                        "
            :key="'seat-name-' + nidx"
            :state="inputSeatName.length >= 4 ? true : false"
          >
            <b-form-input
              :id="'seat-name-input' + nidx"
              v-model="inputSeatName"
              :state="inputSeatName !== ''"
              :type="'text'"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="col-md-2"
            id="seat-count"
            label="Seat Head Count"
            :label-for="'seat-count-input' + nidx"
            :key="'seat-count-' + nidx"
          >
            <b-form-input
              :id="'seat-count-input' + nidx"
              v-model="inputSeatCount"
              :type="'number'"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group
            v-if="nidx === 0"
            class="col-md-4"
            id="seat-group-name"
            description="set seat name."
            label="Seat Group Name"
            label-for="seat-group-name-input"
            :invalid-feedback="
                            nidx > 0
                                ? inputSeatGroupName.length >= 4
                                    ? ''
                                    : 'Enter at least 4 characters'
                                : ''
                        "
            :key="'seat-group-name-' + nidx"
            :state="
                            nidx > 0
                                ? inputSeatGroupName.length >= 4
                                    ? true
                                    : false
                                : true
                        "
            :disabled="nidx === 0"
          >
            <b-form-input
              id="seat-group-name-input"
              v-model="inputSeatGroupName"
              :state="inputSeatGroupName !== ''"
              :type="'text'"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group v-else :key="'seat-group-name-' + nidx" class="col-md-4"></b-form-group>
        </template>
      </div>
    </div>
    <!-- TODO: -->
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
const namespace: string = "layout";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({})
export default class Index extends Vue {
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

  get hallOptions() {
    const hallOptions: any[] = [];
    for (var h in this.layout.halls) {
      if (this.hallId === 0) {
        this.hallId = this.layout.halls[h].id;
      }
      let hallObject: { value: number; text: string } = {
        value: this.layout.halls[h].id,
        text:
          this.layout.halls[h].hall_code + " " + this.layout.halls[h].hall_name
      };
      hallOptions.push(hallObject);
    }
    return hallOptions;
  }

  get layoutOptions() {
    const layoutOptions: any[] = [];
    if (this.hallId !== 0) {
      const hall = this.layout.halls.filter(e => e.id === this.hallId);
      for (var l in hall[0].layouts) {
        if (this.layoutId === 0) {
          this.layoutId = hall[0].layouts[l].id;
        }
        let layoutObject: { value: number; text: string } = {
          value: hall[0].layouts[l].id,
          text:
            hall[0].layouts[l].layout_code +
            " " +
            hall[0].layouts[l].layout_name
        };

        layoutOptions.push(layoutObject);
      }
    }
    return layoutOptions;
  }

  //data
  inputSeatName = "";
  inputSeatCount = 1;
  inputSeatGroupName = "";
  seatGroupNumber = 1;
  seatGroupNumberOptions = [
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
    { value: 6, text: "6" }
  ];

  created() {
    // vue
    this.$store.dispatch("layout/fetchHalls");
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
