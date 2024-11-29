export interface Doubles {
    member?: string;
    roomNumber?: string;
    item?: string;
    quantity?: number;
    organization?: string;
    noDoubles?: string;
}

export interface Summary {
    [key: string]: number;
    Total: number;
}

export type Info = {
    date: string;
    totalPrice: number;
};
