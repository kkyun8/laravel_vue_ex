<template>
  <b-row>
    <h3>Layout Header</h3>
    <b-card></b-card>
  </b-row>
</template>

<script lang="ts">
import Vue from "vue";
import { State, Action, Getter, Mutation } from "vuex-class";
import Component from "vue-class-component";
import { LayoutState, Layout } from "../../store/types";
const namespace: string = "layout";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import mutations from "../../store/layout/mutations";

@Component({})
export default class Index extends Vue {
  @State("layout") layout!: LayoutState;
  @Action("getHalls", { namespace }) getHalls: any;
  @Mutation("setHallLayout", { namespace }) setHallLayout: any;

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
