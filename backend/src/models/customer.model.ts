export interface Customer {
    id?: number;
    customer_name: string;
    mobile: string;
    email?: string;
    business_name: string;
    gst_number?: string;
    customer_type: 'Retail' | 'Wholesale' | 'Distributor';
    address: string;
    status?: 'Lead' | 'Active' | 'Inactive';
    follow_up_date?: string;
    notes?: string;
}