'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { ProductCard, Product } from '@/components/ProductCard';
import { ProductGrid } from '@/components/ProductGrid';
import { SearchBar } from '@/components/SearchBar';
import { AlertCircle, Loader2 } from 'lucide-react';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { useRouter, useSearchParams } from 'next/navigation';

function ProductCatalogContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = (searchParams.get('lang') as 'ar' | 'en') || 'ar';

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('name_ar', { ascending: true });

                if (error) throw error;

                const allProducts = data || [];
                setProducts(allProducts);

                // Initial filtering based on URL params
                const categoryParam = searchParams.get('category');
                const queryParam = searchParams.get('q');

                let filtered = allProducts;

                if (categoryParam) {
                    filtered = filtered.filter(p =>
                        p.category.toLowerCase() === categoryParam.toLowerCase()
                    );
                }

                if (queryParam) {
                    const lowerQuery = queryParam.toLowerCase();
                    filtered = filtered.filter(p =>
                        p.name_ar.toLowerCase().includes(lowerQuery) ||
                        p.name_en.toLowerCase().includes(lowerQuery) ||
                        p.category.toLowerCase().includes(lowerQuery)
                    );
                }

                setFilteredProducts(filtered);
            } catch (err: any) {
                console.error('Error fetching products:', err.message);
                setError(locale === 'ar' ? 'عذراً، تعذر تحميل المنتجات. يرجى المحاولة لاحقاً.' : 'Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [locale, searchParams]);

    const handleSearch = (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        router.push(`?${params.toString()}`);
    };

    const toggleLocale = () => {
        const newLocale = locale === 'ar' ? 'en' : 'ar';
        const params = new URLSearchParams(searchParams);
        params.set('lang', newLocale);
        router.push(`?${params.toString()}`);
    };

    const isRtl = locale === 'ar';

    return (
        <div className="min-h-screen bg-zinc-50 py-8 px-4 dark:bg-black sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
            <header className="mb-12 flex flex-col items-center gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl">
                        {isRtl ? 'كتالوج المنتجات' : 'Product Catalog'}
                    </h1>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                        {isRtl ? 'اكتشف أفضل صفقات المنتجات الطبية' : 'Discover the best deals on medical products'}
                    </p>
                </div>

                <button
                    onClick={toggleLocale}
                    className="rounded-full bg-teal-50 px-4 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 hover:bg-teal-100 transition-colors"
                >
                    {isRtl ? 'Switch to English' : 'تغيير إلى العربية'}
                </button>

                <SearchBar onSearch={handleSearch} locale={locale} />
            </header>

            <main className="mx-auto max-w-7xl">
                {loading ? (
                    <ProductGrid>
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </ProductGrid>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-red-50 p-12 text-center dark:bg-red-900/10">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                        <p className="text-lg font-medium text-red-800 dark:text-red-400">{error}</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400">
                            {isRtl ? 'لم يتم العثور على منتجات تطابق بحثك.' : 'No products found matching your search.'}
                        </p>
                    </div>
                ) : (
                    <ProductGrid>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} locale={locale} />
                        ))}
                    </ProductGrid>
                )}
            </main>
        </div>
    );
}

export default function ProductCatalogPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
        }>
            <ProductCatalogContent />
        </Suspense>
    );
}
