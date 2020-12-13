export interface RootState {
    version: string;
    common: Common
}

export interface CommonState {
    loading: Common["loading"];
    success: Common["success"];
    warning: Common["warning"];
    error: Common["error"];
}

export interface Common {
    loading: boolean;
    success: string;
    warning: string;
    error: string;
}

export interface LayoutState {
    code: Layout["code"];
    halls: Layout["halls"];
    hallLayout: Layout["hallLayout"];
    seats: Layout["seats"];
    seatGroups: Layout["seatGroups"];
    hallId: Layout["hallId"];
    layoutId: Layout["layoutId"];
    editSeats: Layout["editSeats"];
    editSeatGroups: Layout["editSeatGroups"];
    editSeatsMinId: Layout["editSeatsMinId"];
    editSeatGroupsMinId: Layout["editSeatGroupsMinId"];
}
export interface Layout {
    code: string;
    halls: any[];
    hallLayout: any[];
    seats: any[];
    seatGroups: any[];
    hallId: number;
    layoutId: number;
    editSeats: any[];
    editSeatGroups: any[];
    editSeatsMinId: number,
    editSeatGroupsMinId: number,
}

export interface GroupsState {
    code: Groups["code"];
    date: Groups["date"];
    groups: Groups["groups"];
    groupId: Groups["groupId"];
    reserveSeats: Groups["reserveSeats"];
    layoutReserveSeats: Groups["layoutReserveSeats"];
    layoutId: Groups["layoutId"];
}

export interface Groups {
    code: string;
    date: string;
    groups: any[];
    groupId: number;
    reserveSeats: number[];
    layoutReserveSeats: { [key: number]: any } ;
    layoutId: number;
}
