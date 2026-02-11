'use server';

import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

export async function getProducts(options: {
    category?: string;
    query?: string;
    featured?: boolean;
    newArrivals?: boolean;
    limit?: number;
} = {}) {
    try {
        // If Supabase is not configured, skip and return mock data immediately
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return getMockProducts(options);
        }

        let supabaseQuery = supabase
            .from('products')
            .select('*');

        if (options.category) {
            supabaseQuery = supabaseQuery.eq('category', options.category);
        }

        if (options.query) {
            supabaseQuery = supabaseQuery.or(`name_ar.ilike.%${options.query}%,name_en.ilike.%${options.query}%,brand_ar.ilike.%${options.query}%,brand_en.ilike.%${options.query}%`);
        }

        if (options.featured) {
            supabaseQuery = supabaseQuery.eq('is_featured', true);
        }

        if (options.newArrivals) {
            supabaseQuery = supabaseQuery.eq('is_new', true);
        }

        if (options.limit) {
            supabaseQuery = supabaseQuery.limit(options.limit);
        }

        const { data, error } = await supabaseQuery;

        if (error) {
            // Silently fall back to mock data for demo robustness
            return getMockProducts(options);
        }

        // Handle empty table case
        if (!data || data.length === 0) {
            return getMockProducts(options);
        }

        return (data as Product[]) || [];
    } catch (error) {
        return getMockProducts(options);
    }
}

export async function getProductById(id: string) {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return getMockProducts({}).find(p => p.id === id) || null;
        }

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return getMockProducts({}).find(p => p.id === id) || null;
        }

        return data as Product;
    } catch (error) {
        return getMockProducts({}).find(p => p.id === id) || null;
    }
}

// Mock data generator for robust demo (in case Supabase is empty)
function getMockProducts(options: any): Product[] {
    const mockDb: Product[] = [
        {
            id: '1',
            name_ar: 'بانادول ادفانس ٥٠٠ ملجم',
            name_en: 'Panadol Advance 500mg',
            price: 12.50,
            old_price: 15.00,
            image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&fit=crop',
            category: 'Medicines',
            brand_en: 'Panadol',
            stock_quantity: 50,
            is_new: true,
            is_featured: true
        },
        {
            id: '2',
            name_ar: 'فيتامين سي سيروم',
            name_en: 'Vitamin C Serum',
            price: 85.00,
            image_url: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=800&fit=crop',
            category: 'Skin Care',
            brand_en: 'Vichy',
            stock_quantity: 12,
            is_new: true
        },
        {
            id: '3',
            name_ar: 'شامبو اطفال ٥٠٠ مل',
            name_en: 'Baby Shampoo 500ml',
            price: 45.00,
            image_url: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&fit=crop',
            category: 'Baby Care',
            brand_en: 'Johnson\'s',
            stock_quantity: 25,
            is_featured: true
        },
        {
            id: '4',
            name_ar: 'فوليك اسيد ٥ ملجم',
            name_en: 'Folic Acid 5mg',
            price: 18.00,
            image_url: 'https://images.unsplash.com/photo-1471864190281-ad5fe9bb0720?q=80&w=800&fit=crop',
            category: 'Vitamins',
            brand_en: 'Solgar',
            stock_quantity: 100,
            is_new: true
        }
    ];

    let results = [...mockDb];
    if (options.category) results = results.filter(p => p.category === options.category);
    if (options.featured) results = results.filter(p => p.is_featured);
    if (options.newArrivals) results = results.filter(p => p.is_new);
    if (options.limit) results = results.slice(0, options.limit);

    return results;
}
