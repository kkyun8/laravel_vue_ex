<template>
    <div>
        <b-tabs content-class="my-3">
            <b-tab title="Reserve Groups" active>
                <ReserveGroups />
            </b-tab>
            <!-- TODO: 該当ホールに配席ずみの予約のみ表示
            <b-tab title="Selectd Seat Reserve Only">
                
                <p>I'm the second tab</p>
            </b-tab> -->
        </b-tabs>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ReserveGroups from "@/components/SeatingChart/Groups/ReserveGroups.vue";
@Component({
    components: {
        ReserveGroups
    }
})
export default class SeatingChartGroups extends Vue {
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
