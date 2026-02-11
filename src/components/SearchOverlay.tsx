'use client';

import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, History, Pill, Heart, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/app/actions/product-actions';
import { Product } from '@/types/product';
import Image from 'next/image';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    locale?: 'ar' | 'en';
}

const TRENDING_SEARCHES = {
    ar: ['فيتامين سي', 'واقي شمس', 'بانادول', 'أوميغا 3', 'مرطب سيرافي'],
    en: ['Vitamin C', 'Sunscreen', 'Panadol', 'Omega 3', 'CeraVe Moisturizer']
};

export function SearchOverlay({ isOpen, onClose, locale = 'ar' }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isRtl = locale === 'ar';

    const handleSearch = (searchTerm: string) => {
        if (searchTerm.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchTerm)}&lang=${locale}`);
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            const data = await getProducts({ query, limit: 4 });
            setResults(data);
            setIsLoading(false);
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-zinc-950 transition-all duration-300 animate-in fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
                <div className="relative flex flex-1 items-center">
                    <Search className="absolute left-1 lg:left-4 text-zinc-400" size={24} />
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                        placeholder={isRtl ? 'عن ماذا تبحث اليوم؟' : 'What are you looking for today?'}
                        className={cn(
                            "w-full rounded-2xl border-none bg-zinc-100 p-4 text-xl font-medium outline-none placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-white lg:px-14 lg:py-6 lg:text-3xl",
                            isRtl ? "lg:pr-14 lg:pl-4" : "lg:pl-14 lg:pr-4"
                        )}
                    />
                </div>
                <button
                    onClick={onClose}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:h-20 lg:w-20"
                >
                    <X size={24} className="lg:scale-[1.5]" />
                </button>
            </div>

            {/* Content */}
            <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
                {!query ? (
                    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Trending */}
                        <div>
                            <div className="mb-6 flex items-center gap-2 text-zinc-400">
                                <TrendingUp size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">{isRtl ? 'الأكثر بحثاً' : 'Trending Now'}</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {TRENDING_SEARCHES[locale].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSearch(s)}
                                        className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:border-shams-blue hover:text-shams-blue dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-shams-blue"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Categories */}
                        <div>
                            <div className="mb-6 flex items-center gap-2 text-zinc-400">
                                <History size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">{isRtl ? 'الأقسام السريعة' : 'Quick Categories'}</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'Med', name: { ar: 'الأدوية', en: 'Medicines' }, icon: Pill, color: 'text-shams-blue', category: 'Medicines' },
                                    { id: 'Cos', name: { ar: 'العناية', en: 'Skin Care' }, icon: Heart, color: 'text-shams-green', category: 'Skin%20Care' },
                                    { id: 'Vit', name: { ar: 'الفيتامينات', en: 'Vitamins' }, icon: Zap, color: 'text-shams-yellow', category: 'Vitamins' },
                                    { id: 'Bab', name: { ar: 'عناية الطفل', en: 'Baby Care' }, icon: ShieldCheck, color: 'text-zinc-400', category: 'Baby%20Care' },
                                ].map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            router.push(`/products?category=${cat.category}&lang=${locale}`);
                                            onClose();
                                        }}
                                        className="group flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 transition-all hover:bg-shams-blue/5 dark:bg-zinc-900/50"
                                    >
                                        <cat.icon className={cn("transition-transform group-hover:scale-110", cat.color)} size={24} />
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{cat.name[locale]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="mb-6 flex items-center justify-between text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Search size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">
                                    {isLoading ? (isRtl ? 'جاري البحث...' : 'Searching...') : (isRtl ? 'النتائج المقترحة' : 'Suggested Results')}
                                </h3>
                            </div>
                            {results.length > 0 && (
                                <button onClick={() => handleSearch(query)} className="text-xs font-black text-shams-blue hover:underline">
                                    {isRtl ? 'عرض كل النتائج' : 'View all results'}
                                </button>
                            )}
                        </div>

                        {results.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {results.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => {
                                            router.push(`/products/${product.id}?lang=${locale}`);
                                            onClose();
                                        }}
                                        className="flex items-center gap-6 p-4 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 hover:bg-shams-blue/5 transition-all text-right rtl:text-right ltr:text-left group"
                                    >
                                        <div className="relative h-16 w-16 bg-white rounded-2xl overflow-hidden p-2 flex-shrink-0 group-hover:scale-105 transition-transform">
                                            <Image src={product.image_url} alt={isRtl ? product.name_ar : product.name_en} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-zinc-900 dark:text-white truncate">
                                                {isRtl ? product.name_ar : product.name_en}
                                            </h4>
                                            <p className="text-shams-blue font-black text-sm mt-1">
                                                {product.price.toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                                            </p>
                                        </div>
                                        <ArrowRight size={20} className={cn("text-zinc-300 group-hover:text-shams-blue transition-all", isRtl ? "rotate-180" : "")} />
                                    </button>
                                ))}
                            </div>
                        ) : !isLoading && (
                            <div className="flex w-full flex-col items-center justify-center py-20 text-center">
                                <div className="h-20 w-20 rounded-full border-4 border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
                                    <Search className="text-zinc-300" size={32} />
                                </div>
                                <p className="mt-6 text-zinc-500">{isRtl ? `لم نجد نتائج لـ "${query}"` : `No results found for "${query}"`}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
