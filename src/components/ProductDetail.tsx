'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Box } from 'lucide-react';
import { Product } from './ProductCard';
import { getLiveStockAction } from '@/app/actions/erp-actions';
import { getDeliveryEstimateAction } from '@/app/actions/delivery-actions';
import { ERPStockStatus } from '@/lib/solver-erp';
import { DeliveryEstimate } from '@/lib/reboost';
import { cn } from '@/lib/utils';
import { CheckoutModal } from './CheckoutModal';

interface ProductDetailProps {
    product: Product;
    locale?: 'ar' | 'en';
}

export function ProductDetail({ product, locale = 'ar' }: ProductDetailProps) {
    const [erpStatus, setErpStatus] = useState<ERPStockStatus | null>(null);
    const [delivery, setDelivery] = useState<DeliveryEstimate | null>(null);
    const [loadingERP, setLoadingERP] = useState(true);
    const [loadingDelivery, setLoadingDelivery] = useState(true);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const isRtl = locale === 'ar';
    const name = isRtl ? product.name_ar : product.name_en;

    useEffect(() => {
        async function syncData() {
            try {
                // Parallel sync for performance
                const [erpRes, deliveryRes] = await Promise.all([
                    getLiveStockAction(product.id),
                    getDeliveryEstimateAction(product.id)
                ]);

                setErpStatus(erpRes);
                setDelivery(deliveryRes);
            } catch (error) {
                console.error('Core sync error:', error);
            } finally {
                setLoadingERP(false);
                setLoadingDelivery(false);
            }
        }
        syncData();
    }, [product.id]);

    return (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12" dir={isRtl ? "rtl" : "ltr"}>
            {/* Product Images Segment */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
                    <Image
                        src={product.image_url || '/placeholder-product.png'}
                        alt={name}
                        fill
                        className="object-contain p-8 lg:p-12"
                        priority
                    />
                </div>
            </div>

            {/* Product Info Segment */}
            <div className="flex w-full flex-col gap-6 lg:w-1/2">
                <div className="flex flex-col gap-2">
                    <nav className="flex gap-2 text-sm text-zinc-500">
                        <span>{product.category}</span>
                        <span>/</span>
                        <span className="text-teal-600 font-medium">{name}</span>
                    </nav>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl lg:text-4xl">
                        {name}
                    </h1>
                </div>

                {/* Pricing Segment */}
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                        {product.price.toFixed(2)} <small className="text-sm uppercase">{isRtl ? 'ر.س' : 'SAR'}</small>
                    </span>
                    {product.old_price && (
                        <span className="text-xl text-zinc-400 line-through">
                            {product.old_price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Real-time ERP & Logistics Sync Group */}
                <div className="flex flex-col gap-3">
                    <div className={cn(
                        "flex items-center gap-3 rounded-2xl p-4 transition-all",
                        loadingERP ? "bg-zinc-100 animate-pulse dark:bg-zinc-800" : "bg-teal-50 dark:bg-teal-900/20"
                    )}>
                        {loadingERP ? (
                            <Box className="h-5 w-5 animate-spin text-zinc-400" />
                        ) : (
                            <ShieldCheck className="h-5 w-5 text-teal-600" />
                        )}
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {loadingERP
                                    ? (isRtl ? 'جاري التحقق من التوفر...' : 'Verifying availability...')
                                    : (isRtl ? 'متوفر في المخزون (Solver ERP)' : 'In Stock (Live ERP Sync)')
                                }
                            </span>
                            {erpStatus && (
                                <span className="text-xs text-zinc-500">
                                    {isRtl ? `آخر تحديث: ${new Date(erpStatus.lastSync).toLocaleTimeString('ar-SA')}` : `Last sync: ${new Date(erpStatus.lastSync).toLocaleTimeString()}`}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center gap-3 rounded-2xl p-4 transition-all",
                        loadingDelivery ? "bg-zinc-100 animate-pulse dark:bg-zinc-800" : "bg-orange-50 dark:bg-orange-900/20"
                    )}>
                        {loadingDelivery ? (
                            <Truck className="h-5 w-5 animate-ping text-zinc-400" />
                        ) : (
                            <Truck className="h-5 w-5 text-orange-600" />
                        )}
                        <div className="flex flex-col text-sm">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {loadingDelivery
                                    ? (isRtl ? 'جاري حساب موعد التوصيل...' : 'Calculating delivery time...')
                                    : (delivery?.isExpress
                                        ? (isRtl ? `توصيل سريع: يصل خلال ${delivery.estimatedMinutes} دقيقة` : `Express: Arrives in ${delivery.estimatedMinutes} mins`)
                                        : (isRtl ? 'توصيل قياسي: غداً' : 'Standard: Arrives tomorrow'))
                                }
                            </span>
                            {!loadingDelivery && <span className="text-xs text-zinc-500 uppercase font-medium">{delivery?.serviceType}</span>}
                        </div>
                    </div>
                </div>

                {/* Actions Segment */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        disabled={!product.in_stock}
                        className={cn(
                            "flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-zinc-900 text-lg font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-50 dark:text-zinc-900",
                            !product.in_stock && "cursor-not-allowed opacity-50"
                        )}
                    >
                        <ShoppingCart size={22} />
                        {isRtl ? 'اشتري الآن' : 'Buy Now'}
                    </button>
                    <button className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-zinc-100 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:hover:bg-zinc-900">
                        <Heart size={22} className="text-zinc-400 group-hover:text-red-500" />
                    </button>
                </div>

                {/* Trust Factors */}
                <div className="grid grid-cols-1 gap-4 rounded-3xl bg-zinc-50 p-6 dark:bg-zinc-900/50 sm:grid-cols-3">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <ShieldCheck className="text-teal-600" size={24} />
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {isRtl ? 'منتج أصلي 100%' : '100% Original'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center border-zinc-200 dark:border-zinc-800 sm:border-x">
                        <RotateCcw className="text-teal-600" size={24} />
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {isRtl ? 'إرجاع سهل خلال 14 يوم' : '14 Days Return'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Truck className="text-teal-600" size={24} />
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {isRtl ? 'شحن آمن مع ريبوست' : 'Safe Shipping'}
                        </span>
                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                productName={name}
                price={product.price}
                locale={locale}
            />
        </div>
    );
}
