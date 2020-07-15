export interface RootState {
    version: string;
}

export interface LayoutState {
    code: Layout["code"];
    halls: Layout["halls"];
    hallLayout: Layout["hallLayout"];
    seats: Layout["seats"];
    hallId: Layout["hallId"];
    layoutId: Layout["layoutId"];
    editHallLayout: Layout["editHallLayout"];
}

export interface Layout {
    code: string;
    halls: any[];
    hallLayout: any[];
    seats: any[];
    hallId: number;
    layoutId: number;
    editHallLayout: any[];
}
