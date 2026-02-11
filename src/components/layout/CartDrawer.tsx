'use client';

import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store/useCart';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { CheckoutModal } from '../CheckoutModal';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    locale: 'ar' | 'en';
}

export function CartDrawer({ isOpen, onClose, locale }: CartDrawerProps) {
    const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCart();
    const isRtl = locale === 'ar';
    const [isMounted, setIsMounted] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 z-[101] shadow-2xl transition-transform duration-500 ease-out flex flex-col",
                    isRtl ? (isOpen ? "left-0" : "-left-full") : (isOpen ? "right-0" : "-right-full")
                )}
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                {/* Header */}
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-shams-blue/10 p-2.5 rounded-2xl text-shams-blue">
                            <ShoppingBag size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                                {isRtl ? 'سلة التسوق' : 'Shopping Cart'}
                            </h2>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                {getItemCount()} {isRtl ? 'منتجات' : 'Items'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-300">
                                <ShoppingBag size={48} strokeWidth={1} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                                    {isRtl ? 'السلة فارغة' : 'Your cart is empty'}
                                </h3>
                                <p className="text-sm text-zinc-500 mt-1">
                                    {isRtl ? 'ابدأ بإضافة منتجاتك المفضلة اليوم!' : 'Start adding your favorite products today!'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-shams-blue text-white rounded-xl font-bold shadow-lg shadow-shams-blue/20 hover:bg-shams-blue/90 transition-all"
                            >
                                {isRtl ? 'العودة للتسوق' : 'Back to Shopping'}
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-24 rounded-2xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-100 dark:border-zinc-800">
                                    <Image
                                        src={item.image_url}
                                        alt={isRtl ? item.name_ar : item.name_en}
                                        fill
                                        className="object-contain p-3"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between gap-2">
                                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                                                {isRtl ? item.name_ar : item.name_en}
                                            </h4>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-zinc-300 hover:text-rose-500 transition-colors flex-shrink-0"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-shams-blue font-black mt-1 text-sm">
                                            {item.price.toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-shams-blue transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-xs font-black text-zinc-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md bg-white dark:bg-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-300 hover:text-shams-blue transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-sm font-black text-zinc-900 dark:text-white">
                                            {(item.price * item.quantity).toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer and Checkout */}
                {items.length > 0 && (
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                                <span>{isRtl ? 'المجموع الفرعي' : 'Subtotal'}</span>
                                <span>{getTotal().toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}</span>
                            </div>
                            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                                <span>{isRtl ? 'التوصيل' : 'Delivery'}</span>
                                <span className="text-shams-green">{isRtl ? 'مجاني' : 'FREE'}</span>
                            </div>
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
                            <div className="flex items-center justify-between text-zinc-950 dark:text-white font-black text-xl">
                                <span>{isRtl ? 'الإجمالي' : 'Total'}</span>
                                <span className="text-shams-blue">{getTotal().toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="w-full h-16 bg-shams-blue text-white rounded-2xl font-black text-lg shadow-xl shadow-shams-blue/30 hover:bg-shams-blue/90 flex items-center justify-center gap-3 group transition-all"
                        >
                            <span>{isRtl ? 'إتمام عملية الشراء' : 'Proceed to Checkout'}</span>
                            <ArrowRight size={22} className={cn("transition-transform group-hover:translate-x-1", isRtl && "group-hover:-translate-x-1 rotate-180")} />
                        </button>

                        <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest">
                            {isRtl ? 'ضرائب القيمة المضافة مشمولة' : 'VAT inclusive'}
                        </p>
                    </div>
                )}
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                productName={isRtl ? "طلبية شمس" : "Shams Order"}
                price={getTotal()}
                locale={locale}
            />
        </>
    );
}
