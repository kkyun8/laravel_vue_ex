<template>
  <div>
    <SeatMaintenanceHeader />
    <SeatMaintenanceDetail @add_seats="addSeats" />
    <SeatMaintenanceLayout :seats_data="seatsData" ref="layout" />
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
  get refs(): any {
    return this.$refs;
  }

  seatsData: any[] = [];

  addSeats(seats: any[]) {
    this.refs.layout.addLayoutSeats(seats);
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
