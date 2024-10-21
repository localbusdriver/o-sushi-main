export interface Items {
    member?: string;
    roomNumber?: string;
    item?: string;
    quantity?: number;
    organization?: string;
    noDoubles?: string;
}

export interface Doubles {
    [key: string]: Items;
}

export interface Summary {
    [key: string]: { pieces: number; rolls: number };
    Total: { pieces: number; rolls: number };
}

export type Info = {
    date: string;
    totalPrice: number;
};
