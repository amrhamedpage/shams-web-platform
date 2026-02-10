'use client';

import { Pill, Twitter, Instagram, Facebook, Youtube, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function Footer() {
    const searchParams = useSearchParams();
    const locale = searchParams.get('lang') === 'en' ? 'en' : 'ar';
    const isRtl = locale === 'ar';

    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-100">
                                <Image
                                    src="/shams-logo-web.svg"
                                    alt="Shams Pharmacy"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <span className="text-xl font-bold text-zinc-900 dark:text-white">
                                {isRtl ? 'صيدليات' : 'Shams'} <span className="text-shams-blue">{isRtl ? 'شمس' : 'Pharmacy'}</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {isRtl
                                ? 'شريكك الموثوق للصحة والجمال في المملكة العربية السعودية. جودة عالية وخدمة سريعة.'
                                : 'Your trusted partner for health and beauty in Saudi Arabia. Premium quality and fast service.'}
                        </p>
                        <div className="flex gap-4 text-zinc-400">
                            <Facebook size={20} className="hover:text-shams-blue cursor-pointer transition-colors" />
                            <Twitter size={20} className="hover:text-shams-blue cursor-pointer transition-colors" />
                            <Instagram size={20} className="hover:text-shams-blue cursor-pointer transition-colors" />
                            <Youtube size={20} className="hover:text-shams-blue cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                            {isRtl ? 'روابط سريعة' : 'Quick Links'}
                        </h3>
                        <nav className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'عن شمس' : 'About Shams'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'الأسئلة الشائعة' : 'FAQs'}</Link>
                        </nav>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                            {isRtl ? 'الأقسام' : 'Categories'}
                        </h3>
                        <nav className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'الأدوية' : 'Medicines'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'العناية بالبشرة' : 'Skin Care'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'الفيتامينات' : 'Vitamins'}</Link>
                            <Link href="#" className="hover:text-shams-blue transition-colors">{isRtl ? 'عناية الطفل' : 'Baby Care'}</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                            {isRtl ? 'اتصل بنا' : 'Contact Us'}
                        </h3>
                        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-shams-blue" />
                                <span dir="ltr">9200 12345</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-shams-blue" />
                                <span>care@shams-pharmacy.sa</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-shams-blue" />
                                <span>{isRtl ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                    <p className="text-center text-xs text-zinc-500">
                        © {new Date().getFullYear()} {isRtl ? 'صيدلية شمس. جميع الحقوق محفوظة.' : 'Shams Pharmacy. All rights reserved.'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
