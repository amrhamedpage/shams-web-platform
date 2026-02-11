export interface Product {
    id: string;
    name_ar: string;
    name_en: string;
    description_ar?: string;
    description_en?: string;
    price: number;
    old_price?: number;
    image_url: string;
    category: string;
    brand_ar?: string;
    brand_en?: string;
    stock_quantity: number;
    is_new?: boolean;
    is_featured?: boolean;
}
