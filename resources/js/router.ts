import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/index/Index.vue";
import SeatingChart from "./components/seatingChart/SeatingChartIndex.vue";
import SeatMaintenance from "./components/seatMaintenance/SeatMaintenanceIndex.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Index,
        props: true
    },
    {
        path: "/seating_chart",
        component: SeatingChart,
        props: true
    },
    {
        path: "/seat_maintenance",
        component: SeatMaintenance,
        props: true
    }
];

const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});

export default router;
