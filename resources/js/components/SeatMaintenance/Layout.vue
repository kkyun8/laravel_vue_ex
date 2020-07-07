<template>
    <div>
        <h2>Layout</h2>
        <SeatContainer
            :layout.sync="layoutSeats"
            :cellSize="cellSize"
            :maxColumnCount="maxColumnCount"
            :maxRowCount="maxRowCount"
            :margin="margin"
            :bubbleUp="bubbleUp"
        >
            <SeatBox :boxId="1">testa</SeatBox>
            <SeatBox :boxId="2" resizeVisible>testb</SeatBox>
        </SeatContainer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
//@ts-ignore
import { Container, Box } from "@dattn/dnd-grid";
import "@dattn/dnd-grid/dist/dnd-grid.css";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Component({
    components: {
        SeatContainer: Container,
        SeatBox: Box
    }
})
export default class Index extends Vue {
    //data
    cellSize = {
        w: 100,
        h: 100
    };
    maxColumnCount = 10;
    maxRowCount = Infinity;
    bubbleUp = false;
    margin = 5;
    boxCount = 4;
    layoutSeats = [
        {
            id: 1,
            hidden: false,
            pinned: false,
            position: {
                x: 0,
                y: 0,
                w: 4,
                h: 2
            }
        },
        {
            id: 2,
            hidden: false,
            pinned: false,
            position: {
                x: 4,
                y: 0,
                w: 2,
                h: 1
            }
        }
    ];

    mounted(): void {
        console.log("hello");
    }
}
</script>

<style></style>
