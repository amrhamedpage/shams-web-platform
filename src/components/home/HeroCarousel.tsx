'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1547032175-7fc8c7bd15b3?q=80&w=2070&auto=format&fit=crop",
        title_ar: "نحن نهتم بصحتك وجمالك",
        subtitle_ar: "تشكيلة واسعة من مستحضرات التجميل والعناية الشخصية بأسعار منافسة",
        title_en: "We Care for Your Health & Beauty",
        subtitle_en: "Wide range of beauty and personal care products at competitive prices",
        bg_color: "from-blue-900/40"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069&auto=format&fit=crop",
        title_ar: "كل ما تحتاجه من فيتامينات",
        subtitle_ar: "عزز مناعتك مع أفضل المكملات الغذائية المختارة بعناية",
        title_en: "All Your Vitamin Needs",
        subtitle_en: "Boost your immunity with carefully selected top-tier supplements",
        bg_color: "from-green-900/40"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070&auto=format&fit=crop",
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
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden rounded-none md:rounded-3xl shadow-xl mx-auto md:max-w-7xl md:mt-6 group">
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
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${isRtl ? 'from-black/70 to-transparent' : 'from-black/70 to-transparent'} rtl:bg-gradient-to-l`} />
                    </div>

                    {/* Text Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="mx-auto w-full max-w-7xl px-8 md:px-16">
                            <div className="max-w-xl text-white space-y-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30`}>
                                    {isRtl ? 'عروض حصرية' : 'Exclusive Offers'}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                                    {isRtl ? slide.title_ar : slide.title_en}
                                </h2>
                                <p className="text-lg md:text-xl font-medium text-white/90">
                                    {isRtl ? slide.subtitle_ar : slide.subtitle_en}
                                </p>
                                <button className={`mt-4 px-8 py-3 rounded-xl font-bold bg-white text-black hover:bg-zinc-100 transition-colors`}>
                                    {isRtl ? 'تسوق الآن' : 'Shop Now'}
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
