import { getProductById } from '@/app/actions/product-actions';
import { ProductDetail } from '@/components/ProductDetail';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

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

    // Fetch product using the robust server action (includes mock fallback)
    const product = await getProductById(id);

    if (!product) {
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

// Generate static params for common products
export async function generateStaticParams() {
    try {
        // If Supabase is not ready, return empty to skip pre-rendering and avoid build crashes
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return [];
        }

        const { data: products } = await supabase
            .from('products')
            .select('id')
            .limit(10);

        return (products || []).map((product) => ({
            id: product.id,
        }));
    } catch (error) {
        return [];
    }
}
