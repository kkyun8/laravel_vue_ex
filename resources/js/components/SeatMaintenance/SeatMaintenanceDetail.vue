<template>
  <div>
    <div class="card mb-2">
      <!-- TODO: 配置修正→共通項目左、詳細右 -->
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
        <div>
          <b-button class="float-right">クリア</b-button>
          <b-button class="float-right mr-2" @click.prevent="createSeats">追加</b-button>
        </div>
        <b-form-row>
          <b-col>
            <b-form-group label="Type">
              <b-form-radio-group
                id="seat-type"
                v-model="seatType"
                :options="seatTypeOptions"
                name="seat-type"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
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
          </b-col>
          <b-col>
            <b-form-group label="Direction">
              <b-form-radio-group
                id="seat-direction"
                v-model="seatDirection"
                :options="seatDirectionOptions"
                name="seat-direction"
              ></b-form-radio-group>
            </b-form-group>

            <b-form-group label="Seat Group Number Count">
              <b-form-select
                id="seat-group-number-input"
                v-model="seatGroupNumber"
                :options="seatGroupNumberOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Arrangement">
              <b-form-radio-group
                id="seat-arrangement"
                v-model="seatArrangement"
                :options="seatArrangementOptions"
                name="seat-arrangement"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group id="seat-count" label="Seat Head Count" :label-for="'seat-count-input'">
              <b-form-input
                id="seat-count-input"
                v-model="inputSeatHeadCount"
                :type="'number'"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row v-for="(row,rowIdx) in seatRow" :key="'row_key_'+rowIdx">
          <b-col v-for="(r,rIdx) in row" :key="'row_key_'+rIdx">
            <b-form-group
              id="seat--number"
              label="Seat Group Number"
              :label-for="'seat-number-input' + r"
              description="select number"
              :key="'seat-number-' + r"
            >
              <b-form-input :id="'seat-group-number-input' + r" :value="r" :disabled="true"></b-form-input>
            </b-form-group>
            <b-form-group
              :id="'seat-name-' + r"
              description="set seat name."
              label="Seat Name"
              :label-for="'seat-name-input' + r"
              :invalid-feedback="
                                inputSeatName[r].length >= 4
                                    ? ''
                                    : 'Enter at least 4 characters'
                            "
              :key="'seat-name-' + r"
              :state="inputSeatName[r].length >= 4 ? true : false"
            >
              <b-form-input
                :id="'seat-name-input' + r"
                v-model="inputSeatName[r]"
                :state="inputSeatName[r] !== ''"
                :type="'text'"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
          <template v-if="isNaN(row[1]) && isNaN(row[2])">
            <b-col :key="'roww_key_'+row" />
            <b-col :key="'roww_key_'+row+ '_'" />
          </template>
          <template v-else-if="!isNaN(row[1]) && isNaN(row[2])">
            <b-col :key="'roww_key_'+row+ '__' " />
          </template>
        </b-form-row>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
const namespace: string = "layout";
import { Vue, Emit, Watch } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
import Seat from "../../modules/layout/Seat";

@Component
export default class SeatMaintenanceDetail extends Vue {
  @Emit("add_seats")
  private addSeats(seat: Seat): void {}

  createSeats() {
    let name: string = "";
    //TODO:サイズ計算予定
    let x: number = 0;
    let y: number = 0;
    let w: number = 20;
    let h: number = 30;
    const count = this.inputSeatHeadCount;
    //
    if (this.seatGroupNumber === 1) {
      name = this.inputSeatName[1];
    } else {
      name = this.inputSeatGroupName;
    }
    const seat = new Seat({
      //新規はid=0
      id: 0,
      name,
      seatGroupId: 0,
      count,
      //ディフォルトサイズ
      x,
      y,
      w,
      h,
    });
    this.addSeats(seat);
  }

  get seatRow(): any[] {
    const result: number[][] = [];
    let row: number[] = [];
    for (var i = 0; i < this.seatGroupNumber; i++) {
      row.push(i + 1);
      if ((i + 1) % 3 === 0 || i + 1 === this.seatGroupNumber) {
        result.push(row);
        row = [];
      }
    }
    return result;
  }

  //insertData
  inputSeatName = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" };
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