<template>
  <div>
    <SeatingChartHeader />
    <SeatingChartGroups />
    <SeatingChartLayout /> 
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SeatingChartHeader from "@/components/SeatingChart/SeatingChartHeader.vue";
import SeatingChartLayout from "@/components/SeatingChart/SeatingChartLayout.vue";
import SeatingChartGroups from "@/components/SeatingChart/SeatingChartGroups.vue";

@Component({
  components: {
    SeatingChartHeader,
    SeatingChartLayout,
    SeatingChartGroups,
  },
})
export default class SeatingChartIndex extends Vue {
  get refs(): any {
    return this.$refs;
  }

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