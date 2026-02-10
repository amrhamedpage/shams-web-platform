import { supabase } from '@/lib/supabase';
import { ProductDetail } from '@/components/ProductDetail';
import { notFound } from 'next/navigation';
import { Product } from '@/components/ProductCard';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ lang?: string }>;
}

export default async function ProductPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { lang } = await searchParams;
    const locale = lang === 'en' ? 'en' : 'ar';

    // Validate UUID to prevent Supabase errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        console.warn(`Invalid UUID provided: ${id}`);
        notFound();
    }

    // Fetch product from Supabase
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) {
        console.error('Error fetching product:', error?.message);
        notFound();
    }

    const isRtl = locale === 'ar';

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 dark:bg-black sm:px-6 lg:px-8">
            <main className="mx-auto max-w-7xl">
                <ProductDetail product={product as Product} locale={locale} />
            </main>
        </div>
    );
}

// Generate static params for common products for sub-second performance
export async function generateStaticParams() {
    const { data: products } = await supabase
        .from('products')
        .select('id')
        .limit(10); // Prerender top 10 products

    return (products || []).map((product) => ({
        id: product.id,
    }));
}
