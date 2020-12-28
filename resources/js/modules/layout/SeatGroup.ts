class SeatGroup {
    public id: number | null;
    public seat_group_name: string;
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
    public seats!: string[];

    constructor(data: {
        id: number | null;
        seat_group_name: string;
        count: number;
        type: number;
        x: number;
        y: number;
        w: number;
        h: number;
        seats: string;
    }) {
        this.id = data.id;
        this.seat_group_name = data.seat_group_name;
        this.count = data.count;
        this.type = data.type;
        this.hidden = false;
        this.pinned = false;
        this.position = {
            x: data.x,
            y: data.y,
            w: data.w,
            h: data.h,
        };
        this.seats = [];
        if (data.seats) {
            JSON.parse(data.seats).forEach((s: any) => {
                this.seats.push(s);
            });
        }
    }
}

// SeatGroup
export { SeatGroup };
