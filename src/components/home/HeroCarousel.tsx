'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const slides = [
    {
        id: 1,
        // Father and Baby in Pharmacy
        image: "/images/hero/carousel3.png",
        title_ar: "نحن نهتم بصحة عائلتك",
        subtitle_ar: "تشكيلة واسعة من منتجات العناية بالصحة لك ولعائلتك",
        title_en: "We Care for Your Family's Health",
        subtitle_en: "Comprehensive health and personal care products for the whole family",
        bg_color: "from-blue-900/40"
    },
    {
        id: 2,
        // Fruits and Vitamins
        image: "/images/hero/carousel1.png",
        title_ar: "كل ما تحتاجه من فيتامينات",
        subtitle_ar: "عزز مناعتك مع أفضل المكملات الغذائية المختارة بعناية",
        title_en: "All Your Vitamin Needs",
        subtitle_en: "Boost your immunity with carefully selected top-tier supplements",
        bg_color: "from-green-900/40"
    },
    {
        id: 3,
        // Mom and Baby
        image: "/images/hero/carousel2.png",
        title_ar: "عروض مذهلة على مستلزمات الطفل",
        subtitle_ar: "أفضل المنتجات العالمية للعناية بطفلك بأفضل الأسعار",
        title_en: "Amazing Deals on Baby Essentials",
        subtitle_en: "Best international baby care brands at the best prices",
        bg_color: "from-rose-900/40"
    }
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    const next = () => {
        setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    };

    const prev = () => {
        setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-xl group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Background Image */}
                    <div className="relative h-full w-full">
                        <Image
                            src={slide.image}
                            alt={isRtl ? slide.title_ar : slide.title_en}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Premium Transparent Overlay so text is readable but image pops on right */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${isRtl ? 'from-[#263C98]/90 via-[#263C98]/60 to-transparent' : 'from-[#263C98]/90 via-[#263C98]/60 to-transparent'} opacity-100 z-10 rtl:bg-gradient-to-l`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent z-10" />
                    </div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex items-center z-20">
                        <div className="mx-auto w-full max-w-7xl px-8 md:px-16">
                            <div className="max-w-xl text-white space-y-6">
                                <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in`}>
                                    {isRtl ? 'عروض حصرية' : 'Exclusive Collection'}
                                </span>
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter drop-shadow-lg">
                                    {isRtl ? slide.title_ar : slide.title_en}
                                </h2>
                                <p className="text-lg md:text-2xl font-medium text-white/90 line-clamp-2 md:line-clamp-none leading-relaxed max-w-lg">
                                    {isRtl ? slide.subtitle_ar : slide.subtitle_en}
                                </p>
                                <button className={`mt-4 group relative px-8 py-4 rounded-full font-bold bg-white text-shams-blue hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden`}>
                                    <span className="relative z-10 text-sm md:text-base tracking-wide">
                                        {isRtl ? 'تسوق المجموعة' : 'Shop Collection'}
                                    </span>
                                    <div className="absolute inset-0 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-all opacity-0 group-hover:opacity-100 rtl:left-auto rtl:right-4"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={24} className="rtl:rotate-180" />
            </button>

            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 transition-all opacity-0 group-hover:opacity-100 rtl:right-auto rtl:left-4"
                aria-label="Next Slide"
            >
                <ChevronRight size={24} className="rtl:rotate-180" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
