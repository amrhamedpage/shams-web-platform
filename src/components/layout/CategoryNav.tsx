'use client';

import Link from 'next/link';
import { Menu, ChevronDown, Zap, Globe, FileText, Activity, Pill, Sparkles, Baby, Scissors, Smile, HeartPulse } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { CategoryMegaMenu } from './CategoryMegaMenu';

export function CategoryNav() {
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const openMenu = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
            closeTimeoutRef.current = null;
        }, 300); // Increased delay for stability
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            openMenu();
        }
    };

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    const lang = searchParams.get('lang');
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    const getIcon = (name: string) => {
        const iconSize = 18;
        switch (name) {
            case 'Medicines':
            case 'الأدوية': return <Pill size={iconSize} className="text-shams-blue" />;
            case 'Vitamins':
            case 'الفيتامينات': return <Sparkles size={iconSize} className="text-shams-yellow" />;
            case 'Skin Care':
            case 'Beauty':
            case 'عناية بالبشرة':
            case 'الجمال': return <Scissors size={iconSize} className="text-rose-400" />;
            case 'Baby Care':
            case 'عناية الطفل وحفاضات': return <Baby size={iconSize} className="text-shams-blue" />;
            case 'Personal Care':
            case 'العناية الشخصية': return <Smile size={iconSize} className="text-emerald-500" />;
            case 'Medical Equipment':
            case 'Healthy Devices':
            case 'أجهزة صحية': return <HeartPulse size={iconSize} className="text-shams-blue" />;
            case 'Flash Sales':
            case 'عروض خاطفة': return <Zap size={iconSize} className="text-shams-yellow" />;
            case 'Shams Global':
            case 'شمس جلوبال': return <Globe size={iconSize} className="text-shams-blue" />;
            case 'Promo Flyer':
            case 'نشرة العروض': return <FileText size={iconSize} className="text-rose-500" />;
            case 'Shamscare Health center':
            case 'مركز شمس الصحي': return <Activity size={iconSize} className="text-shams-blue" />;
            default: return null;
        }
    };

    return (
        <div
            className="w-full bg-white/60 backdrop-blur-md border-b border-zinc-100/50 hidden md:block dark:bg-black/60 dark:border-zinc-800/50 relative"
            onMouseLeave={closeMenu}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-8 flex-1">

                        <div
                            className="relative"
                            onMouseEnter={openMenu}
                        >
                            <button
                                onClick={handleButtonClick}
                                className={cn(
                                    "flex items-center gap-4 px-6 py-5 font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 min-w-[200px] justify-between",
                                    "bg-shams-blue text-white shadow-xl shadow-shams-blue/10 hover:bg-shams-blue/95 border border-shams-blue/20"
                                )}>
                                <ChevronDown size={18} className={cn("transition-transform duration-500", isMenuOpen && "rotate-180")} />
                                <span className="flex-1 text-center font-bold tracking-wider">
                                    {isRtl ? 'تسوق حسب الفئات' : 'Shop by Category'}
                                </span>
                                <Menu size={22} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Horizontal Premium Links - Scrolling Area */}
                        <nav className="flex items-center gap-1 sm:gap-2 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                            {/* Promotional Links */}
                            {NAV_LINKS.map((link, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="group flex items-center gap-2.5 py-5 px-3 text-xs font-black uppercase tracking-tight text-zinc-700 hover:text-shams-blue whitespace-nowrap transition-all duration-300 dark:text-zinc-300 dark:hover:text-white"
                                >
                                    <div className="transition-transform duration-300 group-hover:scale-110">
                                        {getIcon(isRtl ? link.name_ar : link.name_en)}
                                    </div>
                                    <span>{isRtl ? link.name_ar : link.name_en}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <CategoryMegaMenu
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        openMenu={openMenu}
                        closeMenu={closeMenu}
                        locale={locale}
                    />

                    {/* Secondary Access */}
                    <div className="hidden xl:flex items-center gap-6 ml-4">
                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-shams-blue/60 hover:text-shams-blue transition-colors flex items-center gap-2 group">
                            <div className="w-2 h-2 rounded-full bg-shams-yellow animate-pulse" />
                            {isRtl ? 'صيدلية قريبة منك' : 'Pharmacies near you'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
