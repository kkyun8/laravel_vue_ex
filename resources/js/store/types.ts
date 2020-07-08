export interface RootState {
    version: string;
}

export interface LayoutState {
    layout: Layout[];
}

export interface Layout {
    code: string;
    halls: any;
    hallLayout: any;
}
