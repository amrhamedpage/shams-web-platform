'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Product {
    id: string;
    name_en: string;
    name_ar: string;
    price: number;
    old_price?: number;
    image_url: string;
    category: string;
    in_stock: boolean;
}

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
        <Link
            href={`/products/${product.id}?lang=${locale}`}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 hover:shadow-xl dark:bg-zinc-900",
                isRtl ? "text-right" : "text-left"
            )}
            dir={isRtl ? "rtl" : "ltr"}
        >
            {/* Badge: Discount */}
            {discount && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    -{discount}%
                </span>
            )}

            {/* Action: Wishlist */}
            <button className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-zinc-500 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-zinc-800/80 dark:text-zinc-400">
                <Heart size={20} />
            </button>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={product.image_url || '/placeholder-product.png'}
                    alt={name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {!product.in_stock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] dark:bg-black/60">
                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-sm font-medium text-white shadow-lg">
                            {isRtl ? 'نفذت الكمية' : 'Out of Stock'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-1 flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-shams-blue dark:text-shams-blue/80">
                    {product.category}
                </span>
                <h3 className="line-clamp-2 text-sm font-semibold text-zinc-800 dark:text-zinc-100 sm:text-base">
                    {name}
                </h3>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                            {product.price.toFixed(2)} <small className="text-[10px] uppercase">{isRtl ? 'ر.س' : 'SAR'}</small>
                        </span>
                        {product.old_price && (
                            <span className="text-xs text-zinc-400 line-through">
                                {product.old_price.toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                            </span>
                        )}
                    </div>

                    <button
                        disabled={!product.in_stock}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 active:scale-95",
                            product.in_stock
                                ? "bg-shams-blue text-white shadow-lg shadow-shams-blue/20 hover:bg-shams-blue/90 hover:shadow-shams-blue/40"
                                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                        )}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
