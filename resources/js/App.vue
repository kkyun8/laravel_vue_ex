<template>
  <div>
    <notifications group="success" position="top left" :speed="300" />
    <notifications group="warn" position="top left" :speed="300" />
    <notifications group="error" position="top left" :speed="300" />
    <main class="m-1">
      <b-container fluid>
        <RouterView />
      </b-container>
    </main>
  </div>
</template>

<script lang="ts">
const namespace: string = "layout";
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Action, Getter, Mutation } from "vuex-class";
import { LayoutState, Layout } from "./store/types";

@Component
export default class App extends Vue {
  @State("layout") layout!: LayoutState;
  @Mutation("setSuccess", { namespace }) setSuccess: any;
  @Mutation("setWarning", { namespace }) setWarning: any;
  @Mutation("setError", { namespace }) setError: any;

  get success(): LayoutState["success"] {
    return this.layout.success;
  }
  set success(success) {
    this.setSuccess(success);
  }

  //TODO: warning message
  get warning(): LayoutState["warning"] {
    return this.layout.warning;
  }
  set warning(warning) {
    this.setWarning(warning);
  }

  get error(): LayoutState["error"] {
    return this.layout.error;
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
        randomNumber: Math.random()
      }
    });

    switch (group) {
      case "success":
        this.success = "";
        break;
      case "warning":
        this.warning = "";
        break;
      case "error":
        this.error = "";
        break;
      default:
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
  margin: 4rem 0;
}
</style>
