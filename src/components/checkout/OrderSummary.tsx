'use client';

import { useCart } from '@/lib/store/useCart';
import { Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export function OrderSummary({ locale }: { locale: string }) {
    const { items, getTotal } = useCart();
    const isRtl = locale === 'ar';
    const total = getTotal();
    const shipping = 15.00; // Fixed shipping for demo
    const finalTotal = total + shipping;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-xl shadow-shams-blue/5 border border-zinc-100 dark:border-zinc-800 sticky top-24">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <ShieldCheck className="text-shams-green" size={20} />
                {isRtl ? 'ملخص الطلب' : 'Order Summary'}
            </h3>

            {/* Items List */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
                            <Image src={item.image_url || '/placeholder.png'} alt={isRtl ? item.name_ar : item.name_en} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold line-clamp-1">{isRtl ? item.name_ar : item.name_en}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-zinc-500">Qty: {item.quantity}</span>
                                <span className="text-sm font-black text-shams-blue">{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Costs */}
            <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                <div className="flex justify-between text-sm text-zinc-600">
                    <span>{isRtl ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span className="font-bold">{total.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600">
                    <span>{isRtl ? 'الشحن' : 'Shipping'}</span>
                    <span className="font-bold">{shipping.toFixed(2)} SAR</span>
                </div>
                <div className="flex justify-between text-lg font-black text-zinc-900 dark:text-white pt-4 border-t border-dashed border-zinc-200">
                    <span>{isRtl ? 'الإجمالي' : 'Total'}</span>
                    <span className="text-shams-blue">{finalTotal.toFixed(2)} SAR</span>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                    <Lock size={12} />
                    {isRtl ? 'دفع آمن ومشفر 100%' : '100% Secure & Encrypted Payment'}
                </div>
                <div className="flex gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                    {/* Placeholders for payment icons - using text or basic shapes if no images available */}
                    <div className="h-6 w-10 bg-zinc-200 rounded"></div>
                    <div className="h-6 w-10 bg-zinc-200 rounded"></div>
                    <div className="h-6 w-10 bg-zinc-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
