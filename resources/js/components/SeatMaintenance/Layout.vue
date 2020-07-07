<template>
  <div>
    <h2>Layout</h2>
    <Contaier>
      <Box />
    </Contaier>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";

@Component({
  components: {
    Container,
    Box
  }
})
export default class Index extends Vue {
  message = "Laravel + Vue.js + TypeScript";
  mounted(): void {
    console.log("hello");
  }
}
</script>

<style>
</style>