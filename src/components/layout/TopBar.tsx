'use client';

import Link from 'next/link';
import { MapPin, HelpCircle, Phone, Globe } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export function TopBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
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
        <div className="w-full bg-zinc-50 border-b border-zinc-200 py-2 text-xs font-medium text-zinc-600 dark:bg-black dark:border-zinc-800 dark:text-zinc-400 hidden md:block">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Left Side (or Right in RTL) */}
                <div className="flex items-center gap-4">
                    <Link href="#" className="flex items-center gap-1.5 hover:text-shams-blue transition-colors">
                        <MapPin size={14} />
                        <span>{isRtl ? 'اعثر على أقرب فرع' : 'Find a Store'}</span>
                    </Link>
                    <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
                    <Link href="#" className="flex items-center gap-1.5 hover:text-shams-blue transition-colors">
                        <HelpCircle size={14} />
                        <span>{isRtl ? 'المساعدة' : 'Help Center'}</span>
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 hover:text-shams-blue transition-colors cursor-pointer">
                        <Phone size={14} />
                        <span dir="ltr">+966 9200 00000</span>
                    </div>
                    <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
                    <button
                        onClick={toggleLocale}
                        className="flex items-center gap-1.5 hover:text-shams-blue transition-colors font-bold"
                    >
                        <Globe size={14} />
                        <span>{isRtl ? 'English' : 'العربية'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
