export interface RootState {
    version: string;
}

export interface MessageState {
    success: Message["success"];
    warning: Message["warning"];
    error: Message["error"];
}

export interface Message {
    success: string;
    warning: string;
    error: string;
}

export interface LayoutState {
    code: Layout["code"];
    halls: Layout["halls"];
    hallLayout: Layout["hallLayout"];
    seats: Layout["seats"];
    hallId: Layout["hallId"];
    layoutId: Layout["layoutId"];
    editSeats: Layout["editSeats"];
    success: Layout["success"];
    warning: Layout["warning"];
    error: Layout["error"];
}

export interface Layout {
    code: string;
    halls: any[];
    hallLayout: any[];
    seats: any[];
    hallId: number;
    layoutId: number;
    editSeats: any[];
    success: string;
    warning: string;
    error: string;
}
