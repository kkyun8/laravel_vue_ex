<template>
    <div>
        <h1>seat maintenance index</h1>
        <Layout />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Layout from "@/components/seatMaintenance/Layout.vue";

@Component({
    components: {
        Layout
    }
})
export default class Index extends Vue {
    mounted(): void {}
}
</script>

<style></style>
