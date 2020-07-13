<template>
  <b-row>
    <b-col cols="12">
      <h3>Layout Header</h3>
      <!-- TODO: -->
      {{hallId}}
      {{layoutId}}
      <b-form-select v-model="hallId" :options="hallOptions.halls"></b-form-select>
      <b-form-select v-model="layoutId" :options="hallOptions.layout"></b-form-select>
      <!-- <b-form-group label-cols="4" label-cols-lg="2" label="Default" label-for="input-default">
          <b-form-input id="input-default"></b-form-input>
      </b-form-group>-->
    </b-col>
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
  @Action("getHallLayouts", { namespace }) getHallLayouts: any;
  @Mutation("setHallId", { namespace }) setHallId: any;
  @Mutation("setLayoutId", { namespace }) setLayoutId: any;

  get hallId(): LayoutState["hallId"] {
    return this.layout.hallId;
  }
  set hallId(hallId) {
    this.setHallId(hallId);
  }
  get layoutId(): LayoutState["layoutId"] {
    return this.layout.layoutId;
  }
  set layoutId(layoutId) {
    this.setLayoutId(layoutId);
  }

  get hallOptions() {
    const hallOptions: any[] = [];
    const LayoutOptions: any[] = [];
    for (var h in this.layout.halls) {
      if (this.hallId === 0) {
        this.hallId = this.layout.halls[h].id;
      }
      let hallObject: { value: number; text: string } = {
        value: this.layout.halls[h].id,
        text:
          this.layout.halls[h].hall_code + " " + this.layout.halls[h].hall_name
      };
      hallOptions.push(hallObject);

      for (var l in this.layout.halls[h].layouts) {
        let layoutObject: { value: number; text: string } = {
          value: this.layout.halls[h].layouts[l].id,
          text:
            this.layout.halls[h].layouts[l].layout_code +
            " " +
            this.layout.halls[h].layouts[l].layout_name
        };

        LayoutOptions.push(layoutObject);
      }
    }
    return { halls: hallOptions, layouts: LayoutOptions };
  }

  created() {
    // vue
    this.$store.dispatch("layout/getHalls");
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
