import { Suspense } from 'react';
import { MainHeader } from '@/components/layout/MainHeader';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
    const { lang } = await searchParams;
    const locale = lang === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950" dir={isRtl ? 'rtl' : 'ltr'}>
            <MainHeader />

            <main className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-20">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2">
                        {isRtl ? 'إتمام الطلب' : 'Checkout'}
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        {isRtl ? 'أكمل بياناتك لإتمام عملية الشراء بأمان' : 'Complete your details to finish your secure purchase'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Left Column (Form) */}
                    <div className="lg:col-span-2">
                        <CheckoutForm locale={locale} />
                    </div>

                    {/* Right Column (Summary) */}
                    <div className="lg:col-span-1">
                        <OrderSummary locale={locale} />
                    </div>
                </div>
            </main>
        </div>
    );
}
