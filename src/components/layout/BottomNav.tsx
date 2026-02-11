'use client';

import Link from 'next/link';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    const navItems = [
        { icon: Home, label: isRtl ? 'الرئيسية' : 'Home', href: `/?lang=${locale}` },
        { icon: Grid, label: isRtl ? 'الفئات' : 'Categories', href: `/products?lang=${locale}` },
        { icon: ShoppingBag, label: isRtl ? 'السلة' : 'Cart', href: '#' },
        { icon: User, label: isRtl ? 'حسابي' : 'Account', href: '#' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
            {/* Glassy Background with Shadow */}
            <div className="absolute inset-x-4 bottom-4 h-20 bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:bg-zinc-900/80 dark:border-white/5 overflow-hidden">
                <nav className="flex justify-around items-center h-full px-4">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex flex-col items-center gap-1 group transition-all"
                        >
                            <div className="p-2 rounded-xl text-zinc-400 group-hover:text-shams-blue group-hover:bg-shams-blue/5 transition-all active:scale-90">
                                <item.icon size={24} strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-500 group-hover:text-shams-blue">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
