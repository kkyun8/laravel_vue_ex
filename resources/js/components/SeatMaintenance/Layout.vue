<template>
  <div>Layout</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Container, Box } from "@dattn/dnd-grid";
// import "@dattn/dnd-grid/dist/dnd-grid.css";

@Component
export default class Index extends Vue {
  message = "Laravel + Vue.js + TypeScript";
  mounted(): void {
    console.log("hello");
  }
}
</script>

<style>
</style>