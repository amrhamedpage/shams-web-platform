'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function DirectionProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const lang = searchParams?.get('lang');
    const isRtl = lang !== 'en'; // Default to Arabic (RTL)

    useEffect(() => {
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.lang = isRtl ? 'ar' : 'en';
    }, [isRtl]);

    return <>{children}</>;
}
