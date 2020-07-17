class Seat {
    protected id: number;
    protected name: string;
    protected seatGroupId: number;
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
        this.seatGroupId = data.seatGroupId;
        this.count = data.count;
        this.hidden = false;
        this.pinned = false;
        this.position.x = data.x;
        this.position.y = data.y;
        this.position.w = data.w;
        this.position.h = data.h;
    }
}

export default Seat;
