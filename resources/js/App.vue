<template>
    <div>
        <notifications group="success" position="top left" :speed="300" />
        <notifications group="warn" position="top left" :speed="300" />
        <notifications group="error" position="top left" :speed="300" />
        <template v-if="loading">
            <div class="background-class" />
            <div class="loading-grow">
                <b-spinner
                    :variant="'info'"
                    type="grow"
                    label="Loading..."
                ></b-spinner>
                <b-spinner
                    :variant="'info'"
                    type="grow"
                    label="Loading..."
                ></b-spinner>
                <b-spinner
                    :variant="'info'"
                    type="grow"
                    label="Loading..."
                ></b-spinner>
            </div>
        </template>
        <main class="m-1">
            <b-container fluid>
                <b-navbar variant="faded" type="light" class="">
                    <b-navbar-brand href="/">Kkyun</b-navbar-brand>
                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item
                                href="/seating_chart"
                                :disabled="setDisable('seating_chart')"
                                >Seating chart</b-nav-item
                            >
                            <b-nav-item
                                href="/seat_maintenance"
                                :disabled="setDisable('seat_maintenance')"
                                >Seat maintenance</b-nav-item
                            >
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
                <div style="padding-top: 6rem" />
                <RouterView />
            </b-container>
        </main>
    </div>
</template>

<script lang="ts">
const namespace = "common";
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Action, Getter, Mutation } from "vuex-class";
import { LayoutState, Layout, CommonState } from "./store/types";

@Component
export default class App extends Vue {
    @State("common") common!: CommonState;
    @Mutation("setLoading", { namespace }) setLoading: any;
    @Mutation("setSuccess", { namespace }) setSuccess: any;
    @Mutation("setWarning", { namespace }) setWarning: any;
    @Mutation("setError", { namespace }) setError: any;

    get loading(): CommonState["loading"] {
        return this.common.loading;
    }
    set loading(loading) {
        this.setLoading(loading);
    }

    get success(): CommonState["success"] {
        return this.common.success;
    }
    set success(success) {
        this.setSuccess(success);
    }

    get warning(): CommonState["warning"] {
        return this.common.warning;
    }
    set warning(warning) {
        this.setWarning(warning);
    }

    get error(): CommonState["error"] {
        return this.common.error;
    }
    set error(error) {
        this.setError(error);
    }

    @Watch("success")
    onSuccessChange(newVal: string, oldVal: string): string {
        if (newVal !== "") {
            this.show("success", "success", newVal);
        }
        return newVal;
    }

    @Watch("warning")
    onWarningChange(newVal: string, oldVal: string): string {
        if (newVal !== "") {
            this.show("warn", "warn", newVal);
        }
        return newVal;
    }

    @Watch("error")
    onErrorChange(newVal: string, oldVal: string): string {
        if (newVal !== "") {
            this.show("error", "error", newVal);
        }
        return newVal;
    }

    show(group: string, type = "", msg: string) {
        const text = msg;

        this.$notify({
            group,
            title: `${group}`,
            text,
            type,
            data: {
                randomNumber: Math.random(),
            },
        });

        switch (group) {
            case "success":
                this.success = "";
                break;
            case "warn":
                this.warning = "";
                break;
            case "error":
                this.error = "";
                break;
            default:
        }
    }

    setDisable(path: string) {
        return this.$route.path.indexOf(path) >= 0;
    }
}
</script>
<style scoped>
h1 {
    text-align: center;
    margin: 4rem 0;
}
.loading-grow {
    position: absolute;
    top: 50%;
    left: 47.5%;
    z-index: 1;
}
.background-class {
    background-color: #452b632b;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
}
</style>
