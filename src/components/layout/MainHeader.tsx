'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/store/useCart';
import { CartDrawer } from './CartDrawer';

export function MainHeader() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { getItemCount } = useCart();

    const lang = searchParams.get('lang');
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            router.push(`/products?q=${encodeURIComponent(query)}&lang=${locale}`);
        }
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-xl border-b border-zinc-100/50 py-4 sticky top-0 z-[60] dark:bg-black/80 dark:border-zinc-800/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-6 lg:gap-12">

                    {/* Logo - Refined Shams Branding */}
                    <Link href={`/?lang=${locale}`} className="flex-shrink-0 flex items-center gap-3 group transition-transform duration-300 hover:scale-105">
                        <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-lg shadow-shams-blue/10 ring-1 ring-zinc-100 group-hover:ring-shams-blue/20 transition-all">
                            <Image
                                src="/shams-logo-web.svg"
                                alt="Shams Pharmacy"
                                fill
                                className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black tracking-tighter text-shams-blue">
                                {isRtl ? 'شمس' : 'Shams'}
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-shams-yellow -mt-1.5">
                                {isRtl ? 'صيدليات' : 'Pharmacy'}
                            </span>
                        </div>
                    </Link>

                    {/* Smart Search Bar - Featured, Glassy, Prominent */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl group">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={isRtl ? "ابحث عن دواء، ماركة، أو منتج..." : "Search for medicine, brand, or product..."}
                                className="w-full h-14 rounded-2xl border border-zinc-200 bg-zinc-50/50 px-6 pr-14 text-base outline-none transition-all duration-300 focus:border-shams-blue/30 focus:bg-white focus:ring-8 focus:ring-shams-blue/5 dark:bg-zinc-900/50 dark:border-zinc-800 dark:focus:ring-white/5 rtl:pr-6 rtl:pl-14"
                            />
                            <button
                                type="submit"
                                className="absolute top-2 bottom-2 right-2 aspect-square rounded-xl bg-shams-blue text-white flex items-center justify-center shadow-lg shadow-shams-blue/20 hover:bg-shams-blue/90 hover:scale-105 active:scale-95 transition-all rtl:right-auto rtl:left-2"
                            >
                                <Search size={22} />
                            </button>
                        </div>
                    </form>

                    {/* Premium Actions */}
                    <div className="flex items-center gap-1 sm:gap-4">
                        {[
                            { icon: User, label: isRtl ? 'حسابي' : 'Account', href: '#' },
                            { icon: Heart, label: isRtl ? 'المفضلة' : 'Wishlist', href: '#' },
                        ].map((item, idx) => (
                            <Link key={idx} href={item.href} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl text-zinc-600 hover:bg-zinc-100/80 hover:text-shams-blue transition-all dark:text-zinc-400 dark:hover:bg-zinc-800/80 group">
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    <item.icon size={26} strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">
                                    {item.label}
                                </span>
                            </Link>
                        ))}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl text-shams-blue bg-shams-blue/5 hover:bg-shams-blue/10 transition-all group relative"
                        >
                            <div className="transition-transform duration-300 group-hover:scale-110">
                                <ShoppingCart size={26} strokeWidth={2} />
                                <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-shams-yellow text-shams-blue text-[11px] font-black flex items-center justify-center border-2 border-white dark:border-black shadow-sm group-hover:scale-110 transition-transform">
                                    {getItemCount()}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">
                                {isRtl ? 'السلة' : 'Cart'}
                            </span>
                        </button>
                    </div>

                    <CartDrawer
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                        locale={locale}
                    />

                </div>

                {/* Mobile Search Bar - Elevated */}
                <form onSubmit={handleSearch} className="mt-4 md:hidden relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={isRtl ? "عن ماذا تبحث؟" : "What are you looking for?"}
                        className="w-full h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-5 text-sm outline-none transition-all focus:border-shams-blue focus:ring-4 focus:ring-shams-blue/10 dark:bg-zinc-900 dark:border-zinc-800"
                    />
                    <button type="submit" className="absolute top-0 bottom-0 right-3 text-shams-blue rtl:right-auto rtl:left-3">
                        <Search size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
