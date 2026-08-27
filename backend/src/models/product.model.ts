export interface Product {
    id?: number;
    product_name: string;
    sku: string;
    category: string;
    unit_price: number;
    current_stock?: number;
    minimum_stock?: number;
    warehouse_location: string;
}