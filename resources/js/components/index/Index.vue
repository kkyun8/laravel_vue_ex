<template>
    <div>
        <b-row align-v="center">
            <b-col>
                <b-card>
                    <b-card-title>Create Reserve Group</b-card-title>
                    <b-card-text>予約グループを作成</b-card-text>
                    <b-button variant="primary" href="/" :disabled="true"
                        >Open</b-button
                    >
                </b-card>
            </b-col>
            <b-col>
                <b-card>
                    <b-card-title>Seating chart</b-card-title>
                    <b-card-text>予約に配席</b-card-text>
                    <b-button variant="primary" href="/seating_chart"
                        >Open</b-button
                    >
                </b-card>
            </b-col>
            <b-col>
                <b-card>
                    <b-card-title>Seat maintenance</b-card-title>
                    <b-card-text>席の配置</b-card-text>
                    <b-button variant="primary" href="/seat_maintenance"
                        >Open</b-button
                    >
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

//宣言しないと見えない
@Component
export default class Index extends Vue {
    mounted(): void {}
}
</script>

<style></style>
