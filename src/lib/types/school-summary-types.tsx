export interface DoublesType {
    item: string;
    quantity: number;
    member: string;
    organization: string;
    roomNumber: string;
}

export interface DoublesResponse {
    results: DoublesType[];
    message: string;
}

export interface SummaryType {
    [key: string]: number;
    Total: number;
}

export type Info = {
    date: string;
    totalPrice: number;
};
