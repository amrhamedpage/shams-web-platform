'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    locale?: 'ar' | 'en';
}

export function SearchBar({ onSearch, placeholder, locale = 'ar' }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const isRtl = locale === 'ar';

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative w-full max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
            <div className="relative flex items-center">
                <div className={cn(
                    "absolute pointer-events-none text-zinc-400 p-3",
                    isRtl ? "right-0" : "left-0"
                )}>
                    <Search size={20} />
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder || (isRtl ? 'ابحث عن منتج...' : 'Search for a product...')}
                    className={cn(
                        "w-full h-12 bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 transition-all text-zinc-900 dark:text-zinc-100",
                        isRtl ? "pr-12 pl-12" : "pl-12 pr-12"
                    )}
                />

                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className={cn(
                            "absolute text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-3",
                            isRtl ? "left-0" : "right-0"
                        )}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
