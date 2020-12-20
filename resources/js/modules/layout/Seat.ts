const SEAT_TYPE_ROOM = 1;

class Seat {
    public id: number;
    public name: string;
    public seatGroupId: number | null;
    public count: number;
    public type: number;
    public hidden: boolean;
    public pinned: boolean;
    public position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    public isChange: boolean;

    constructor(data: {
        id: number;
        name: string;
        seat_group_id: number | null;
        count: number;
        type: number;
        x: number;
        y: number;
        w: number;
        h: number;
        isChange: boolean;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.seatGroupId =
            typeof data.seat_group_id === "number" ? data.seat_group_id : null;
        this.count = data.count;
        this.type = data.type;
        this.hidden = false;
        this.pinned = true;
        this.position = {
            x: data.x,
            y: data.y,
            w: data.w,
            h: data.h,
        };
        if (typeof true === "boolean") {
            this.isChange = data.isChange;
        } else {
            this.isChange = false;
        }
    }
}

export { Seat, SEAT_TYPE_ROOM };
