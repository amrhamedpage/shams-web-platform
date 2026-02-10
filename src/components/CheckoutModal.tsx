'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle2, CreditCard, Apple, ShieldCheck, Loader2 } from 'lucide-react';
import { PaymentMethod, PaymentSession } from '@/lib/payment';
import { initiatePaymentAction, processPaymentAction } from '@/app/actions/payment-actions';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    price: number;
    locale?: 'ar' | 'en';
}

export function CheckoutModal({ isOpen, onClose, productName, price, locale = 'ar' }: CheckoutModalProps) {
    const [step, setStep] = useState<'method' | 'processing' | 'success'>('method');
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('mada');
    const [loading, setLoading] = useState(false);
    const isRtl = locale === 'ar';

    if (!isOpen) return null;

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const session = await initiatePaymentAction(price, selectedMethod);
            setStep('processing');
            const success = await processPaymentAction(session.sessionId);
            if (success) {
                setStep('success');
            } else {
                alert(isRtl ? 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' : 'Payment failed. Please try again.');
                setStep('method');
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir={isRtl ? "rtl" : "ltr"}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl dark:bg-zinc-900">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 rounded-full bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {step === 'method' && (
                        <div className="flex flex-col gap-6">
                            <div className="text-center sm:text-right">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                    {isRtl ? 'إكمال الدفع' : 'Complete Checkout'}
                                </h2>
                                <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                                    {productName} • {price.toFixed(2)} {isRtl ? 'ر.س' : 'SAR'}
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { id: 'mada', name: isRtl ? 'مدى' : 'Mada', icon: CreditCard, color: 'bg-blue-50 text-blue-600' },
                                    { id: 'apple_pay', name: 'Apple Pay', icon: Apple, color: 'bg-zinc-900 text-white' },
                                    { id: 'card', name: isRtl ? 'بطاقة ائتمان' : 'Credit Card', icon: CreditCard, color: 'bg-zinc-50 text-zinc-600' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                                        className={cn(
                                            "flex items-center justify-between rounded-2xl border-2 p-4 transition-all duration-300",
                                            selectedMethod === method.id
                                                ? "border-teal-500 bg-teal-50/50 dark:bg-teal-900/10"
                                                : "border-zinc-100 bg-white hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", method.color)}>
                                                <method.icon size={20} />
                                            </div>
                                            <span className="font-semibold text-zinc-900 dark:text-white">{method.name}</span>
                                        </div>
                                        {selectedMethod === method.id && (
                                            <CheckCircle2 className="text-teal-500" size={20} />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="mt-4 flex w-full items-center justify-center rounded-2xl bg-zinc-900 py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    isRtl ? `دفع ${price.toFixed(2)} ر.س` : `Pay ${price.toFixed(2)} SAR`
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                                <ShieldCheck size={14} />
                                <span>{isRtl ? 'دفع آمن ومدفوع بواسطة شمس' : 'Secure payment powered by Shams'}</span>
                            </div>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="relative mb-6">
                                <div className="h-20 w-20 rounded-full border-4 border-zinc-100 dark:border-zinc-800" />
                                <Loader2 className="absolute inset-0 h-20 w-20 animate-spin text-teal-500" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                {isRtl ? 'جاري معالجة الدفع...' : 'Processing Payment...'}
                            </h3>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                {isRtl ? 'يرجى عدم إغلاق الصفحة' : 'Please do not close the page'}
                            </p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {isRtl ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
                            </h3>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                {isRtl ? 'سيصلك طلبك قريباً مع شمس' : 'Your order will arrive soon with Shams'}
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 rounded-2xl bg-zinc-900 px-8 py-3 font-bold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
                            >
                                {isRtl ? 'متابعة التسوق' : 'Continue Shopping'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
