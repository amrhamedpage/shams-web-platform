'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/store/useCart';

import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
    locale?: 'ar' | 'en';
}

export function ProductCard({ product, locale = 'ar' }: ProductCardProps) {
    const isRtl = locale === 'ar';
    const name = isRtl ? product.name_ar : product.name_en;

    const discount = product.old_price
        ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
        : null;

    return (
        <div className="group relative flex flex-col rounded-[2.5rem] bg-white p-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(38,60,152,0.1)] dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 h-full" dir={isRtl ? "rtl" : "ltr"}>
            <Link
                href={`/products/${product.id}?lang=${locale}`}
                className="flex flex-col h-full"
            >
                {/* Image Container - Premium Aspect */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-zinc-800/50 group-hover:bg-zinc-100 transition-colors">
                    {/* Badge: Premium Discount */}
                    {discount && (
                        <div className="absolute top-4 left-4 z-10 rounded-full bg-rose-500 px-3 py-1 text-[11px] font-black text-white shadow-lg shadow-rose-500/20">
                            -{discount}%
                        </div>
                    )}

                    {/* Action: Wishlist - Floating */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-4 right-4 z-10 rounded-full bg-white/60 p-2.5 text-zinc-400 backdrop-blur-md transition-all hover:bg-white hover:text-rose-500 dark:bg-zinc-800/60 dark:text-zinc-500 shadow-sm hover:scale-110 active:scale-95"
                    >
                        <Heart size={18} strokeWidth={2} />
                    </button>

                    <Image
                        src={product.image_url || '/placeholder-product.png'}
                        alt={name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {product.stock_quantity <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[4px] dark:bg-black/40 z-20">
                            <span className="rounded-xl bg-zinc-900/80 px-4 py-2 text-xs font-black text-white shadow-xl backdrop-blur-md uppercase tracking-widest">
                                {isRtl ? 'نفذت الكمية' : 'Out of Stock'}
                            </span>
                        </div>
                    )}

                    {/* Hover Quick Add - Floating Action */}
                    {product.stock_quantity > 0 && (
                        <div className="absolute bottom-4 inset-x-4 z-20 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    useCart.getState().addItem(product);
                                }}
                                className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-shams-blue text-white shadow-xl shadow-shams-blue/30 hover:bg-shams-blue/90 active:scale-95 transition-all text-sm font-black"
                            >
                                <ShoppingCart size={20} />
                                <span>{isRtl ? 'أضف للسلة' : 'Add to Cart'}</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Content - Refined Typography */}
                <div className="mt-5 px-3 pb-4 flex flex-1 flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-shams-blue/60 dark:text-shams-blue/40">
                        {product.category}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-bold text-zinc-800 dark:text-zinc-100 sm:text-base leading-tight group-hover:text-shams-blue transition-colors">
                        {name}
                    </h3>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-black text-shams-blue dark:text-white">
                                    {product.price.toFixed(2)}
                                </span>
                                <span className="text-[10px] font-black uppercase text-zinc-400">
                                    {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                            </div>
                            {product.old_price && (
                                <span className="text-[11px] text-zinc-400 line-through font-medium">
                                    {product.old_price.toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                                </span>
                            )}
                        </div>

                        {/* Mobile-only Quick Add (Always visible) */}
                        <button
                            disabled={product.stock_quantity <= 0}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                useCart.getState().addItem(product);
                            }}
                            className={cn(
                                "md:hidden flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 active:scale-90",
                                product.stock_quantity > 0
                                    ? "bg-shams-blue text-white shadow-lg shadow-shams-blue/20"
                                    : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                            )}
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
