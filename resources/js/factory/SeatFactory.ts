import Seat from "../modules/layout/Seat";

export default abstract class SeatFactory extends Seat {
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
        super(data);
    }
}
