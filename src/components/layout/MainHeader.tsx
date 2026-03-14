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
        <div className="w-full bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-[60] dark:bg-zinc-950 dark:border-zinc-800 transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-2 md:gap-6 lg:gap-12 py-3 md:py-4">

                    {/* Logo - Refined Shams Branding */}
                    <Link href={`/?lang=${locale}`} className="flex-shrink-0 flex items-center gap-2 md:gap-3 group transition-transform duration-300 hover:scale-105">
                        <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-100 group-hover:ring-shams-blue/20 transition-all">
                            <Image
                                src="/shams-logo-web.svg"
                                alt="Shams Pharmacy"
                                fill
                                className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h1 className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-shams-blue">
                                {isRtl ? 'صيدليات شمس' : 'Shams Pharmacy'}
                            </span>
                        </h1>
                    </Link>

                    {/* Smart Search Bar - Featured, Glassy, Prominent */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl group">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={isRtl ? "ابحث عن دواء، ماركة، أو منتج..." : "Search for medicine, brand, or product..."}
                                className="w-full h-12 md:h-14 rounded-full border border-zinc-200 bg-zinc-50 px-6 pr-14 text-base outline-none transition-all duration-300 focus:border-shams-blue focus:ring-4 focus:ring-shams-blue/10 dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-shams-blue/20 rtl:pr-6 rtl:pl-14 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                            />
                            <button
                                type="submit"
                                className="absolute top-1.5 bottom-1.5 right-1.5 aspect-square rounded-full bg-shams-blue text-white flex items-center justify-center hover:bg-shams-blue/90 hover:scale-105 active:scale-95 transition-all rtl:right-auto rtl:left-1.5"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>

                    {/* Premium Actions */}
                    <div className="flex items-center gap-0.5 sm:gap-4">
                        {[
                            { icon: User, label: isRtl ? 'حسابي' : 'Account', href: '#' },
                            { icon: Heart, label: isRtl ? 'المفضلة' : 'Wishlist', href: '#' },
                        ].map((item, idx) => (
                            <Link key={idx} href={item.href} className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-2xl text-[#263C98] hover:bg-white/20 hover:text-[#263C98] transition-all group">
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    <item.icon size={24} strokeWidth={2} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block text-[#263C98]">
                                    {item.label}
                                </span>
                            </Link>
                        ))}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-2xl text-[#263C98] hover:bg-white/20 hover:text-[#263C98] transition-all group relative"
                        >
                            <div className="transition-transform duration-300 group-hover:scale-110">
                                <ShoppingCart size={24} strokeWidth={2} />
                                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#263C98] text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                                    {getItemCount()}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block text-[#263C98]">
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
