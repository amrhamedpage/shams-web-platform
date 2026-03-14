'use client';

import { useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandCarouselProps {
    locale: 'en' | 'ar';
}

export function BrandCarousel({ locale }: BrandCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isRtl = locale === 'ar';

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const brands = [
        {
            name: 'Vichy',
            productImg: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
            accent: '#0066CC',
            bgGradient: 'linear-gradient(145deg, #E8F4FD 0%, #D0E8F7 100%)',
        },
        {
            name: 'La Roche-Posay',
            productImg: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
            accent: '#004C8C',
            bgGradient: 'linear-gradient(145deg, #E3EFF8 0%, #C8DEF0 100%)',
        },
        {
            name: 'CeraVe',
            productImg: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=600&auto=format&fit=crop',
            accent: '#1B4D7A',
            bgGradient: 'linear-gradient(145deg, #EDF2F7 0%, #D4E0ED 100%)',
        },
        {
            name: 'Eucerin',
            productImg: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
            accent: '#CC0033',
            bgGradient: 'linear-gradient(145deg, #FDE8EC 0%, #F5CED6 100%)',
        },
        {
            name: 'Bioderma',
            productImg: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop',
            accent: '#E85D8A',
            bgGradient: 'linear-gradient(145deg, #FDF0F4 0%, #F7D8E3 100%)',
        },
        {
            name: 'Cetaphil',
            productImg: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
            accent: '#008080',
            bgGradient: 'linear-gradient(145deg, #E0F5F5 0%, #BFE8E8 100%)',
        },
    ];

    return (
        <section className="w-full py-16 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #FCCE22 0%, #F5B800 50%, #FCCE22 100%)' }}>
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-orange-300/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-200/20 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-shams-blue">
                            {isRtl ? 'تسوق حسب الماركة' : 'Shop by Brand'}
                        </h2>
                        <p className="mt-2 text-shams-blue/70 font-bold text-lg">
                            {isRtl ? 'أفضل الماركات العالمية بين يديك' : 'Top International Brands'}
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={() => scroll(isRtl ? 'right' : 'left')}
                            className="h-12 w-12 rounded-full bg-white/30 hover:bg-white/60 flex items-center justify-center text-shams-blue transition-all duration-300 backdrop-blur-sm active:scale-95 shadow-lg shadow-black/5"
                        >
                            <ArrowLeft size={22} className={isRtl ? 'rotate-180' : ''} />
                        </button>
                        <button
                            onClick={() => scroll(isRtl ? 'left' : 'right')}
                            className="h-12 w-12 rounded-full bg-white/30 hover:bg-white/60 flex items-center justify-center text-shams-blue transition-all duration-300 backdrop-blur-sm active:scale-95 shadow-lg shadow-black/5"
                        >
                            <ArrowRight size={22} className={isRtl ? 'rotate-180' : ''} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {brands.map((brand, i) => (
                        <div
                            key={i}
                            className="group relative flex-shrink-0 w-[220px] md:w-[260px] rounded-[28px] overflow-hidden shadow-xl shadow-black/8 hover:shadow-2xl hover:shadow-black/15 transition-all duration-500 hover:-translate-y-3 cursor-pointer snap-center"
                            style={{ background: '#fff' }}
                        >
                            {/* Product Image Area */}
                            <div
                                className="h-[200px] w-full relative flex items-center justify-center overflow-hidden"
                                style={{ background: brand.bgGradient }}
                            >
                                {/* Subtle pattern overlay */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                    backgroundSize: '20px 20px',
                                    color: brand.accent
                                }} />

                                <div className="relative w-[85%] h-[85%] transform group-hover:scale-110 transition-transform duration-700 ease-out p-4">
                                    <img
                                        src={brand.productImg}
                                        alt={`${brand.name} Product`}
                                        className="w-full h-full object-contain drop-shadow-lg"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Floating accent ring */}
                                <div
                                    className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: brand.accent }}
                                />
                            </div>

                            {/* Brand Name Area */}
                            <div className="px-6 py-5 flex flex-col items-center gap-3 bg-white">
                                <span
                                    className="text-lg font-black tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ color: brand.accent, letterSpacing: '0.1em' }}
                                >
                                    {brand.name}
                                </span>

                                {/* Decorative line */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-[2px] w-6 rounded-full group-hover:w-10 transition-all duration-500"
                                        style={{ background: brand.accent, opacity: 0.3 }}
                                    />
                                    <span
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{ background: brand.accent, opacity: 0.4 }}
                                    />
                                    <span
                                        className="h-[2px] w-6 rounded-full group-hover:w-10 transition-all duration-500"
                                        style={{ background: brand.accent, opacity: 0.3 }}
                                    />
                                </div>

                                <span className="text-xs text-gray-400 font-medium tracking-wide">
                                    {isRtl ? 'تسوق الآن' : 'Shop Now'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
