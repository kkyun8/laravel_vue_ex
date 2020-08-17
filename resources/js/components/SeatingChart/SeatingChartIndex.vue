<template>
  <div>
    <SeatingChartHeader />
    <SeatingChartLayout />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SeatingChartLayout from "@/components/SeatingChart/SeatingChartLayout.vue";
import SeatingChartHeader from "@/components/SeatingChart/SeatingChartHeader.vue";

@Component({
  components: {
    SeatingChartHeader,
    SeatingChartIndex,
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