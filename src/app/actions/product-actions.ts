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
            name_en: 'Panadol Advance 500mg',
            name_ar: 'بانادول ادفانس ٥٠٠ ملجم',
            price: 12.50,
            old_price: 15.00,
            category: 'Medicines',
            // Medicine pills/tablets on white background
            image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
            description_en: 'Effective relief from mild to moderate pain.',
            description_ar: 'تخفيف فعال للألم الخفيف إلى المتوسط.',
            brand_en: 'Panadol',
            stock_quantity: 50,
            is_new: true,
            is_featured: true
        },
        {
            id: '2',
            name_en: 'CeraVe Moisturizing Cream',
            name_ar: 'سيرـافي كريم مرطب',
            price: 85.00,
            old_price: 105.00,
            category: 'Skin Care',
            // White moisturizing cream jar
            image_url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop',
            description_en: 'Rich, non-greasy, fast-absorbing moisturizing cream.',
            description_ar: 'كريم مرطب غني، غير دهني، وسريع الامتصاص.',
            brand_en: 'CeraVe',
            stock_quantity: 12,
            is_new: true,
            is_featured: true
        },
        {
            id: '3',
            name_en: 'Centrum with Lutein',
            name_ar: 'سنتروم مع لوتين',
            price: 55.00,
            old_price: 68.00,
            category: 'Vitamins',
            // Vitamin supplement capsules
            image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop',
            description_en: 'Complete multivitamin with Lutein.',
            description_ar: 'فيتامينات متعددة كاملة مع اللوتين.',
            brand_en: 'Centrum',
            stock_quantity: 100,
            is_new: true
        },
        {
            id: '4',
            name_en: 'Pampers Premium Care Size 3',
            name_ar: 'بامبرز عناية مميزة مقاس ٣',
            price: 92.00,
            old_price: 110.00,
            category: 'Baby Care',
            // Baby care products / cute baby
            image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
            description_en: 'Softest comfort and best skin protection.',
            description_ar: 'أنعم راحة وأفضل حماية للبشرة.',
            brand_en: 'Pampers',
            stock_quantity: 25,
            is_new: true
        },
        {
            id: '5',
            name_en: 'La Roche-Posay Anthelios 50+',
            name_ar: 'لاروش بوزيه أنثيليوس ٥٠+',
            price: 120.00,
            old_price: 145.00,
            category: 'Skin Care',
            // Sunscreen / skincare product
            image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
            brand_en: 'La Roche-Posay',
            stock_quantity: 30,
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
