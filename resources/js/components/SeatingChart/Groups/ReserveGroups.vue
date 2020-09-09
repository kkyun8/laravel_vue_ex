<template>
  <div>
    <b-card tag="article" class="w-100">
      <b-row>
        <div class="col-md-6 col-xl-3">
          <div class="card card-stats mb-4" show-footer-line="true">
            <!---->
            <!---->
            <!---->
            <div class="card-body">
              <!---->
              <!---->
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">Total traffic</h5>
                  <span class="h2 font-weight-bold mb-0">350,897</span>
                </div>
                <div class="col-auto">
                  <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                    <i class="ni ni-active-40"></i>
                  </div>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <span class="text-success mr-2">3.48%</span>
                <span class="text-nowrap">Since last month</span>
              </p>
            </div>
            <!---->
            <!---->
            <!---->
            <!---->
          </div>
        </div>
      </b-row>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
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