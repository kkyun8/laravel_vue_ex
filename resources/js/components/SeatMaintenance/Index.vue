<template>
  <div>
    <h2>Layout</h2>
    <Header />
    <Layout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/seatMaintenance/Header.vue";
import Layout from "@/components/seatMaintenance/Layout.vue";

@Component({
  components: {
    Header,
    Layout
  }
})
export default class Index extends Vue {
  mounted(): void {}
}
</script>

<style></style>
