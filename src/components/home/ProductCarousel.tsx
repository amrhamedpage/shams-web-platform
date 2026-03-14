'use client';

import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';

interface ProductCarouselProps {
    products: Product[];
    locale: 'en' | 'ar';
}

export function ProductCarousel({ products, locale }: ProductCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isRtl = locale === 'ar';

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;

            // Adjust scrolling logic for RTL layouts
            if (isRtl) {
                const targetScroll = container.scrollLeft + (direction === 'right' ? -scrollAmount : scrollAmount);
                container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            } else {
                const targetScroll = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
                container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="relative group w-full" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Scroll Navigation Arrows */}
            {products.length > 4 && (
                <>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-50 border border-zinc-100 text-shams-blue transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none focus:ring-2 focus:ring-shams-blue rtl:left-auto rtl:-right-4"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} className="rtl:rotate-180" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-zinc-50 border border-zinc-100 text-shams-blue transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:outline-none focus:ring-2 focus:ring-shams-blue rtl:right-auto rtl:-left-4"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} className="rtl:rotate-180" />
                    </button>
                </>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbars px-2 md:px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ensure scrollbars are hidden natively as fallback
            >
                <style jsx>{`
                    .hide-scrollbars::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {products.map((product) => (
                    <div key={product.id} className="min-w-[180px] md:min-w-[260px] snap-start h-full shrink-0">
                        <ProductCard
                            locale={locale}
                            product={product}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
