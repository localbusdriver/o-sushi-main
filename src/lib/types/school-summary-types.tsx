export interface DoublesType {
    item: string;
    quantity: number;
    student: string;
    school: string;
    roomNumber: string;
}

export interface SummaryType {
    [key: string]: number;
    Total: number;
}

export type Info = {
    date: string;
    totalPrice: number;
};
