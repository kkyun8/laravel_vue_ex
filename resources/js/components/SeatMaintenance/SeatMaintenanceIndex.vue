<template>
    <div>
        <h2>Layout</h2>
        <SeatMaintenanceHeader />
        <SeatMaintenanceLayout />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SeatMaintenanceHeader from "@/components/seatMaintenance/SeatMaintenanceHeader.vue";
import SeatMaintenanceLayout from "@/components/seatMaintenance/SeatMaintenanceLayout.vue";

@Component({
    components: {
        SeatMaintenanceHeader,
        SeatMaintenanceLayout
    }
})
export default class SeatMaintenanceIndex extends Vue {
    mounted(): void {}
}
</script>

<style></style>
