<template>
  <div>
    <h3>Layout Header</h3>
    <b-row class="py-2">
      <b-col cols="6">
        <b-form-select label-field="Hall" v-model="hallId" :options="hallOptions"></b-form-select>
      </b-col>
      <b-col cols="6">
        <b-form-select label-field="Hall" v-model="layoutId" :options="layoutOptions"></b-form-select>
      </b-col>
    </b-row>
    <!-- TODO: -->
    <!-- <div>
      <b-input-group class="mt-3">
        <template v-slot:append>
          <b-input-group-text>
            <strong class="text-danger">!</strong>
          </b-input-group-text>
        </template>
        <b-form-input></b-form-input>
      </b-input-group>
      <b-form-input></b-form-input>
      <b-card></b-card>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
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
  @Action("getHallLayout", { namespace }) getHallLayout: any;
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
    this.$store.dispatch("layout/getHallLayout", layoutId);
  }

  get hallOptions() {
    const hallOptions: any[] = [];
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
    }
    return hallOptions;
  }

  get layoutOptions() {
    const layoutOptions: any[] = [];
    if (this.hallId !== 0) {
      const hall = this.layout.halls.filter(e => e.id === this.hallId);
      for (var l in hall[0].layouts) {
        if (this.layoutId === 0) {
          this.layoutId = hall[0].layouts[l].id;
        }
        let layoutObject: { value: number; text: string } = {
          value: hall[0].layouts[l].id,
          text:
            hall[0].layouts[l].layout_code +
            " " +
            hall[0].layouts[l].layout_name
        };

        layoutOptions.push(layoutObject);
      }
    }
    return layoutOptions;
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
