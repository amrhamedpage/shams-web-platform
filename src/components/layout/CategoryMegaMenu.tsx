'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, Category } from '@/lib/constants';

interface CategoryMegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    openMenu: () => void;
    closeMenu: () => void;
    locale?: 'ar' | 'en';
}

export function CategoryMegaMenu({ isOpen, onClose, openMenu, closeMenu, locale = 'ar' }: CategoryMegaMenuProps) {
    const isRtl = locale === 'ar';
    const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);

    if (!isOpen) return null;

    return (
        <div
            className="absolute top-full left-0 right-0 z-[100] animate-in fade-in slide-in-from-top-2 duration-300"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex bg-white shadow-2xl rounded-b-3xl overflow-hidden border border-zinc-100 min-h-[500px] dark:bg-zinc-900 dark:border-zinc-800">

                    {/* Sidebar - Level 1 Categories */}
                    <div className="w-1/4 bg-zinc-50 border-e border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800 py-6">
                        <nav className="flex flex-col">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onMouseEnter={() => setActiveCategory(cat)}
                                    className={cn(
                                        "flex items-center justify-between px-6 py-4.5 text-sm font-bold transition-all duration-200 border-b border-zinc-100/50 dark:border-zinc-800/50 last:border-0",
                                        activeCategory.id === cat.id
                                            ? "bg-shams-blue text-white shadow-lg z-10"
                                            : "text-zinc-800 hover:bg-zinc-100 hover:text-shams-blue dark:text-zinc-200 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    <span className="tracking-tight">{isRtl ? cat.name_ar : cat.name_en}</span>
                                    {isRtl ? (
                                        <ChevronLeft size={14} className={activeCategory.id === cat.id ? "text-white" : "text-zinc-400"} />
                                    ) : (
                                        <ChevronRight size={14} className={activeCategory.id === cat.id ? "text-white" : "text-zinc-400"} />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area - Level 2 Subcategories */}
                    <div className="flex-1 bg-white dark:bg-zinc-900 p-8">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                                {isRtl ? activeCategory.name_ar : activeCategory.name_en}
                            </h3>
                            <div className="h-1 w-20 bg-shams-blue rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeCategory.subCategories.map((sub, i) => (
                                <Link
                                    key={i}
                                    href={`${sub.href}&lang=${locale}`}
                                    onClick={onClose}
                                    className="flex flex-col gap-1 group"
                                >
                                    <span className="text-sm font-bold text-zinc-700 group-hover:text-shams-blue transition-colors dark:text-zinc-300">
                                        {isRtl ? sub.name_ar : sub.name_en}
                                    </span>
                                    <div className="h-px w-0 bg-shams-blue/30 group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* Optional Advertisement / Featured Section could go here, similar to Nahdi */}
                        <div className="mt-12 p-6 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                            <p className="text-xs text-zinc-400 text-center italic">
                                {isRtl ? 'اكتشف عروضنا الحصرية في هذا القسم' : 'Discover our exclusive offers in this section'}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Transparent Backdrop for Click-Outside - Only handles clicks */}
            <div
                className="fixed inset-0 z-[-1] bg-black/0 cursor-default"
                onClick={onClose}
            />
        </div>
    );
}
