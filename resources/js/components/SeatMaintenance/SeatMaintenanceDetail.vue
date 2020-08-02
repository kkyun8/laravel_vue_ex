<template>
  <div>
    <div class="card mb-2">
      <b-button
        :aria-expanded="insertSeatViewFlg ? 'true' : 'false'"
        variant="outline-primary"
        aria-controls="'insert-seat-collapse'"
        @click.prevent="insertSeatViewFlg = !insertSeatViewFlg"
      >席登録</b-button>
    </div>
    <b-collapse id="insert-seat-collapse" v-model="insertSeatViewFlg" class="mt-2">
      <div class="card p-3 mb-2">
        <h4>Insert Seat</h4>
        <b-form-row>
          <b-form-group class="col-md-2" label="Seat Group Number Count">
            <b-form-select
              id="seat-group-number-input"
              v-model="seatGroupNumber"
              :options="seatGroupNumberOptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group class="col-md-2" label="Type">
            <b-form-radio-group
              id="seat-type"
              v-model="seatType"
              :options="seatTypeOptions"
              name="seat-type"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group class="col-md-2" label="Direction">
            <b-form-radio-group
              id="seat-direction"
              v-model="seatDirection"
              :options="seatDirectionOptions"
              name="seat-direction"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group class="col-md-2" label="Arrangement">
            <b-form-radio-group
              id="seat-arrangement"
              v-model="seatArrangement"
              :options="seatArrangementOptions"
              name="seat-arrangement"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group
            class="col-md-4"
            id="seat-group-name"
            label="Seat Group Name"
            label-for="seat-group-name-input"
            :invalid-feedback="'Enter at least 4 characters'"
            :state="inputSeatGroupName.length >= 4 ? false: true"
          >
            <b-form-input
              id="seat-group-name-input"
              v-model="inputSeatGroupName"
              :state="inputSeatGroupName !== ''"
              :type="'text'"
              :disabled="seatGroupNumber === 1"
              trim
            ></b-form-input>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <template v-for="(n, nidx) in seatGroupNumber">
            <b-form-group
              class="col-md-2"
              id="seat--number"
              label="Seat Group Number"
              :label-for="'seat-number-input' + nidx"
              description="select number"
              :key="'seat-number-' + nidx"
            >
              <b-form-input
                :id="'seat-group-number-input' + nidx"
                :value="nidx + 1"
                :disabled="true"
              ></b-form-input>
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
                v-model="inputSeatHeadCount"
                :type="'number'"
                :disabled="nidx > 0"
                trim
              ></b-form-input>
            </b-form-group>
            <b-col cols="4" :key="'seat-count-col-' + nidx"></b-col>
          </template>
        </b-form-row>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
const namespace: string = "layout";
import { Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";

@Component
export default class SeatMaintenanceDetail extends Vue {
  //insertData
  inputSeatName = "";
  inputSeatHeadCount = 1;
  inputSeatGroupName = "";
  seatGroupNumber = 1;
  seatGroupNumberOptions = [
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
    { value: 6, text: "6" },
  ];
  seatDirection = 0;
  seatDirectionOptions = [
    { value: 0, text: "横長" },
    { value: 1, text: "縦長" },
  ];
  seatArrangement = 0;
  seatArrangementOptions = [
    { value: 0, text: "横並び" },
    { value: 1, text: "縦並び" },
  ];
  seatType = 0;
  seatTypeOptions = [
    { value: 0, text: "ホール席" },
    { value: 1, text: "個室" },
  ];
  insertSeatViewFlg = false;
}
</script>

<style></style>