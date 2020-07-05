import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/index/Index.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Index,
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
