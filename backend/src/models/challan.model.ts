export interface Challan {
    id?: number;
    challan_number: string;
    customer_id: number;
    date: Date;
    status: string;
}