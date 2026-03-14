'use client';

import { useState } from 'react';
import { CreditCard, Truck, Wallet, CheckCircle, MapPin, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'success';

export function CheckoutForm({ locale }: { locale: string }) {
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const isRtl = locale === 'ar';

    const renderShipping = () => (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <MapPin className="text-shams-blue" />
                {isRtl ? 'عنوان التوصيل' : 'Shipping Address'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'الاسم الأول' : 'First Name'}</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-zinc-300 rtl:right-3 rtl:left-auto" size={18} />
                        <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="John" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'اسم العائلة' : 'Last Name'}</label>
                    <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="Doe" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-zinc-300 rtl:right-3 rtl:left-auto" size={18} />
                    <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="john@example.com" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'رقم الجوال' : 'Phone Number'}</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 text-zinc-300 rtl:right-3 rtl:left-auto" size={18} />
                    <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="+966 5..." />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'العنوان' : 'Street Address'}</label>
                <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="123 Main St, Riyadh" />
            </div>

            <button
                onClick={() => setStep('payment')}
                className="w-full bg-shams-blue text-white font-black py-4 rounded-xl shadow-xl shadow-shams-blue/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
            >
                {isRtl ? 'الاستمرار للدفع' : 'Continue to Payment'}
                <ChevronRight size={20} className="rtl:rotate-180" />
            </button>
        </div>
    );

    const renderPayment = () => (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <CreditCard className="text-shams-blue" />
                {isRtl ? 'طريقة الدفع' : 'Payment Method'}
            </h2>

            <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-shams-blue bg-shams-blue/5 text-shams-blue font-bold shadow-sm transition-all">
                    <CreditCard size={24} />
                    <span className="text-xs">{isRtl ? 'بطاقة' : 'Card'}</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 text-zinc-500 font-bold transition-all">
                    <Wallet size={24} />
                    <span className="text-xs">Apple Pay</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 text-zinc-500 font-bold transition-all">
                    <Truck size={24} />
                    <span className="text-xs">{isRtl ? 'عند الاستلام' : 'COD'}</span>
                </button>
            </div>

            <div className="space-y-4 pt-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'رقم البطاقة' : 'Card Number'}</label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-3 text-zinc-300 rtl:right-3 rtl:left-auto" size={18} />
                        <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="0000 0000 0000 0000" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'تاريخ الانتهاء' : 'Expiry'}</label>
                        <input className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">{isRtl ? 'رمز الأمان' : 'CVC'}</label>
                        <input type="password" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-shams-blue/20 outline-none transition-all" placeholder="123" />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={() => setStep('shipping')}
                    className="w-1/3 bg-zinc-100 text-zinc-600 font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all"
                >
                    {isRtl ? 'رجوع' : 'Back'}
                </button>
                <button
                    onClick={() => setStep('success')}
                    className="w-2/3 bg-shams-green text-white font-black py-4 rounded-xl shadow-xl shadow-shams-green/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                    {isRtl ? 'إتمام الطلب' : 'Complete Order'}
                    <CheckCircle size={20} />
                </button>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-10 animate-fade-in">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 mb-2">{isRtl ? 'تم الطلب بنجاح!' : 'Order Placed!'}</h2>
            <p className="text-zinc-500 max-w-sm mx-auto mb-8">
                {isRtl ? 'شكراً لثقتكم بصيدليات شمس. سيصلك بريد إلكتروني بتفاصيل الطلب قريباً.' : 'Thank you for trusting Shams Pharmacy. You will receive an email with order details shortly.'}
            </p>
            <button
                onClick={() => window.location.href = `/?lang=${locale}`}
                className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:scale-105 transition-all"
            >
                {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
        </div>
    );

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-shams-blue/5 border border-zinc-50 dark:border-zinc-800">
            {/* Steps Indicator - Visual Only */}
            {step !== 'success' && (
                <div className="flex items-center justify-center gap-4 mb-10 overflow-hidden">
                    <div className={cn("flex items-center gap-2 font-bold", step === 'shipping' ? "text-shams-blue" : "text-green-500")}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm", step === 'shipping' ? "bg-shams-blue text-white" : "bg-green-100 text-green-600")}>1</div>
                        <span>{isRtl ? 'الشحن' : 'Shipping'}</span>
                    </div>
                    <div className="w-10 h-0.5 bg-zinc-200"></div>
                    <div className={cn("flex items-center gap-2 font-bold", step === 'payment' ? "text-shams-blue" : "text-zinc-400")}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm", step === 'payment' ? "bg-shams-blue text-white" : "bg-zinc-100 text-zinc-400")}>2</div>
                        <span>{isRtl ? 'الدفع' : 'Payment'}</span>
                    </div>
                </div>
            )}

            {step === 'shipping' && renderShipping()}
            {step === 'payment' && renderPayment()}
            {step === 'success' && renderSuccess()}
        </div>
    );
}
