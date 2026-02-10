'use client';

import Image from 'next/image';
import { Pill, Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchOverlay } from './SearchOverlay';

export function Navbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const lang = searchParams.get('lang');
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    const toggleLocale = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', nextLocale);
        router.push(`?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href={`/?lang=${locale}`} className="flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-100">
                            <Image
                                src="/shams-logo-web.svg"
                                alt="Shams Pharmacy"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            {isRtl ? 'صيدليات' : 'Shams'} <span className="text-shams-blue">{isRtl ? 'شمس' : 'Pharmacy'}</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex md:items-center md:gap-8">
                        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            <Link href={`/products?lang=${locale}`} className="transition-colors hover:text-shams-blue">{isRtl ? 'المنتجات' : 'Products'}</Link>
                            <Link href="#" className="transition-colors hover:text-shams-blue">{isRtl ? 'العروض' : 'Offers'}</Link>
                            <Link href="#" className="transition-colors hover:text-shams-blue">{isRtl ? 'الفروع' : 'Branches'}</Link>
                        </nav>

                        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleLocale}
                                className="rounded-lg px-3 py-1 text-xs font-bold text-shams-blue bg-shams-blue/5 hover:bg-shams-blue/10 transition-colors"
                            >
                                {isRtl ? 'EN' : 'العربية'}
                            </button>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <Search size={20} />
                            </button>
                            <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <User size={20} />
                            </button>
                            <button className="relative rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <ShoppingCart size={20} />
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-shams-blue text-[10px] font-bold text-white">0</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-zinc-500"
                        >
                            <Search size={24} />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black md:hidden">
                    <nav className="flex flex-col gap-4">
                        <Link href={`/products?lang=${locale}`} className="text-lg font-bold text-zinc-900 dark:text-white" onClick={() => setIsMenuOpen(false)}>{isRtl ? 'المنتجات' : 'Products'}</Link>
                        <Link href="#" className="text-lg font-bold text-zinc-900 dark:text-white" onClick={() => setIsMenuOpen(false)}>{isRtl ? 'العروض' : 'Offers'}</Link>
                        <Link href="#" className="text-lg font-bold text-zinc-900 dark:text-white" onClick={() => setIsMenuOpen(false)}>{isRtl ? 'الفروع' : 'Branches'}</Link>
                        <hr className="border-zinc-100 dark:border-zinc-800" />
                        <button
                            onClick={() => { toggleLocale(); setIsMenuOpen(false); }}
                            className="flex items-center gap-2 text-lg font-bold text-shams-blue"
                        >
                            {isRtl ? 'Switch to English' : 'تغيير للغة العربية'}
                        </button>
                    </nav>
                </div>
            )}

            {/* Premium Search Overlay */}
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                locale={locale}
            />
        </header>
    );
}
