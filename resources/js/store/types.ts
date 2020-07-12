export interface RootState {
    version: string;
}

export interface LayoutState {
    code: Layout["code"];
    halls: Layout["halls"];
    hallLayout: Layout["hallLayout"];
    seats: Layout["seats"];
}

export interface Layout {
    code: string;
    halls: any[];
    hallLayout: any[];
    seats: any[];
}
