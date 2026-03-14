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
        <div className="group relative flex flex-col rounded-[1.5rem] bg-white p-2 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(38,60,152,0.12)] hover:border-shams-blue/20 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 h-full hover:-translate-y-1" dir={isRtl ? "rtl" : "ltr"}>
            <Link
                href={`/products/${product.id}?lang=${locale}`}
                className="flex flex-col h-full"
            >
                {/* Image Container - Scientific Elegance Aspect Ratio */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#F8FAFC] dark:bg-zinc-800/30 group-hover:bg-white border border-transparent group-hover:border-zinc-100 transition-all duration-500">
                    {/* Badge: Minimalist Glass */}
                    {discount && (
                        <div className="absolute top-3 left-3 z-10 rounded-full bg-shams-yellow/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-black text-shams-blue shadow-lg shadow-shams-yellow/10 tracking-wide">
                            {discount}% OFF
                        </div>
                    )}

                    {/* Action: Wishlist - Floating Glass */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-3 right-3 z-10 rounded-full bg-white/80 p-2 text-zinc-400 backdrop-blur-md transition-all hover:bg-white hover:text-rose-500 hover:shadow-md active:scale-90"
                    >
                        <Heart size={16} strokeWidth={2.5} />
                    </button>

                    <Image
                        src={product.image_url || '/placeholder-product.png'}
                        alt={name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:drop-shadow-xl"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Out of Stock Overlay */}
                    {product.stock_quantity <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-20">
                            <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest">
                                {isRtl ? 'نفذت الكمية' : 'Sold Out'}
                            </span>
                        </div>
                    )}

                    {/* Desktop Quick Add - Slide Up Glass */}
                    {product.stock_quantity > 0 && (
                        <div className="absolute bottom-3 inset-x-3 z-20 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    useCart.getState().addItem(product);
                                }}
                                className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-shams-blue/90 backdrop-blur-md text-white shadow-lg shadow-shams-blue/20 hover:bg-shams-blue active:scale-95 transition-all text-xs font-bold uppercase tracking-wider"
                            >
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
