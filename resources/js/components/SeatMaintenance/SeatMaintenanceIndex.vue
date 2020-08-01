<template>
  <div>
    <SeatMaintenanceHeader />
    <SeatMaintenanceDetail @set_seats_data="setSeatsData" />
    <SeatMaintenanceLayout :seats_data="seatsData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SeatMaintenanceHeader from "@/components/seatMaintenance/SeatMaintenanceHeader.vue";
import SeatMaintenanceDetail from "@/components/seatMaintenance/SeatMaintenanceDetail.vue";
import SeatMaintenanceLayout from "@/components/seatMaintenance/SeatMaintenanceLayout.vue";

@Component({
  components: {
    SeatMaintenanceHeader,
    SeatMaintenanceDetail,
    SeatMaintenanceLayout,
  },
})
export default class SeatMaintenanceIndex extends Vue {
  seatsData: any[] = [];

  setSeatsData(data: any[]) {
    this.seatsData = [];
    if (data.length > 0) {
      data.forEach((e) => this.seatsData.push(e));
    }
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
