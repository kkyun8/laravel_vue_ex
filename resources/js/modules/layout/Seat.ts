class Seat {
    protected id: number;
    protected name: string;
    protected seatGroupId: number | null;
    protected count: number;
    protected hidden: boolean;
    protected pinned: boolean;
    protected position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };

    constructor(data: {
        id: number;
        name: string;
        seatGroupId: number;
        count: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.seatGroupId = !data.seatGroupId ? null : data.seatGroupId;
        this.count = data.count;
        this.hidden = false;
        this.pinned = false;
        this.position = {
            x: data.x,
            y: data.y,
            w: data.w,
            h: data.h
        };
    }
}

interface SeatInterface {
    id: number;
    name: string;
    seatGroupId: number | null;
    count: number;
    hidden: boolean;
    pinned: boolean;
    position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}

export { Seat, SeatInterface };
