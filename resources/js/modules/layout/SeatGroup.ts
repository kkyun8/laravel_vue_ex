import { SeatInterface } from "./Seat";

class SeatGroup {
    protected id: number;
    protected seat_group_name: string;
    protected count: number;
    protected hidden: boolean;
    protected pinned: boolean;
    protected position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    protected seat_names!: Array<string>;

    constructor(data: {
        id: number;
        seat_group_name: string;
        count: number;
        x: number;
        y: number;
        w: number;
        h: number;
        seat_names: Array<string>;
    }) {
        this.id = data.id;
        this.seat_group_name = data.seat_group_name;
        this.count = data.count;
        this.hidden = false;
        this.pinned = false;
        this.position = {
            x: data.x,
            y: data.y,
            w: data.w,
            h: data.h
        };
        data.seat_names.forEach(e => this.seat_names.push(e));
    }
}

interface SeatGroupInterface {
    id: number;
    seat_group_name: string;
    count: number;
    type: number;
    hidden: boolean;
    pinned: boolean;
    position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    seat_name: Array<string>;
}

// SeatGroup
export { SeatGroup, SeatGroupInterface };
