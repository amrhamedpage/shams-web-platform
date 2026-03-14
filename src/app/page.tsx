import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import { ArrowRight, Pill, Heart, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { BrandCarousel } from '@/components/home/BrandCarousel';
import { ProductCard } from '@/components/ProductCard';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { getProducts } from '@/app/actions/product-actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const locale = lang === 'en' ? 'en' : 'ar';
  const isRtl = locale === 'ar';

  // Fetch dynamic products
  const newArrivals = await getProducts({ newArrivals: true, limit: 10 });

  return (
    <div className="flex flex-col gap-12 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <Suspense fallback={<div className="w-full h-[300px] md:h-[400px] lg:h-[480px] bg-zinc-100 animate-pulse" />}>
        <HeroCarousel />
      </Suspense>


      {/* Circular Categories Row */}
      <section className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 pt-4 md:justify-center no-scrollbar items-start">
          {[
            { id: 'Medicines', title_ar: 'الأدوية', title_en: 'Medicines', iconImg: '/images/categories/medicines.png' },
            { id: 'Skin Care', title_ar: 'الجمال والعناية', title_en: 'Beauty & Care', iconImg: '/images/categories/beauty-care.png' },
            { id: 'Vitamins', title_ar: 'فيتامينات', title_en: 'Vitamins', iconImg: '/images/categories/vitamins.png' },
            { id: 'Baby Care', title_ar: 'عناية الطفل', title_en: 'Baby Care', iconImg: '/images/categories/baby-care.png' },
            { id: 'Personal Care', title_ar: 'عناية شخصية', title_en: 'Personal Care', iconImg: '/images/categories/personal-care.png' }
          ].map(cat => (
            <Link key={cat.id} href={`/products?category=${encodeURIComponent(cat.id)}&lang=${locale}`} className="flex flex-col items-center gap-3 min-w-[90px] md:min-w-[110px] group">
              <div className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-transparent bg-white shadow-md group-hover:border-shams-blue transition-all duration-300 group-hover:shadow-lg group-hover:shadow-shams-blue/20">
                <img src={cat.iconImg} alt={cat.title_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-sm md:text-base font-bold text-zinc-800 dark:text-zinc-200 text-center group-hover:text-shams-blue transition-colors leading-tight">
                {isRtl ? cat.title_ar : cat.title_en}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Categories Banners */}
      <section className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Main Featured: Medicines */}
          <Link href={`/products?category=Medicines&lang=${locale}`} className="group relative overflow-hidden rounded-3xl bg-zinc-100 md:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[220px] md:min-h-[280px]">
            <img
              src="/images/categories/medicines-banner.png"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Medicines"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-shams-blue/90 via-shams-blue/40 to-transparent rtl:bg-gradient-to-l z-10" />
            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 z-20 max-w-sm">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{isRtl ? 'الأدوية والعلاجات' : 'Medicines & Treatments'}</h3>
              <p className="text-white/90 text-sm md:text-base font-medium mb-4">{isRtl ? 'كل ما تحتاجه لصحتك بأسعار منافسة' : 'Everything you need for health at competitive prices'}</p>
              <div className="inline-flex items-center justify-center bg-white text-shams-blue font-bold text-sm px-5 py-2.5 rounded-full hover:bg-shams-yellow transition-colors">
                {isRtl ? 'تسوق الآن' : 'Shop Now'}
              </div>
            </div>
          </Link>

          {/* Secondary Featured: Beauty */}
          <Link href={`/products?category=Skin%20Care&lang=${locale}`} className="group relative overflow-hidden rounded-3xl bg-zinc-100 lg:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[220px] md:min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Beauty"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-shams-green/90 via-shams-green/30 to-transparent rtl:bg-gradient-to-l z-10" />
            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 z-20 max-w-sm">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{isRtl ? 'جمال وصحة' : 'Beauty & Care'}</h3>
              <p className="text-white/90 text-sm md:text-base font-medium mb-4">{isRtl ? 'تألقي مع أفضل الماركات العالمية' : 'Shine with the best international brands'}</p>
              <div className="inline-flex items-center justify-center bg-white text-shams-green font-bold text-sm px-5 py-2.5 rounded-full hover:bg-zinc-100 transition-colors">
                {isRtl ? 'اكتشف المزيد' : 'Discover More'}
              </div>
            </div>
          </Link>

          {/* Tertiary: Vitamins */}
          <Link href={`/products?category=Vitamins&lang=${locale}`} className="group relative overflow-hidden rounded-3xl bg-zinc-100 md:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[200px]">
            <img
              src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1200&auto=format&fit=crop"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Vitamins"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent z-10" />
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <h3 className="text-xl font-black text-white flex items-center justify-between">
                <span>{isRtl ? 'فيتامينات ومكملات' : 'Vitamins & Supplements'}</span>
                <ArrowRight className="text-shams-yellow rtl:rotate-180" size={20} />
              </h3>
            </div>
          </Link>

          {/* Quaternary: Baby Care */}
          <Link href={`/products?category=Baby%20Care&lang=${locale}`} className="group relative overflow-hidden rounded-3xl bg-zinc-100 md:col-span-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[200px]">
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Baby Care"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent z-10" />
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <h3 className="text-xl font-black text-white flex items-center justify-between">
                <span>{isRtl ? 'عناية الطفل الأمثل' : 'Premium Baby Care'}</span>
                <ArrowRight className="text-blue-300 rtl:rotate-180" size={20} />
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals Section - Dynamic */}
      <section className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-12 flex items-center justify-between px-1">
          <h2 className="text-xl md:text-3xl font-black text-zinc-900 dark:text-white">
            {isRtl ? 'وصل حديثاً' : 'New Arrivals'}
          </h2>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-shams-blue" />
            <div className="h-2 w-2 rounded-full bg-zinc-200" />
            <div className="h-2 w-2 rounded-full bg-zinc-200" />
          </div>
        </div>

        {/* THE FIX: Modern scrolling component replacing raw overflowing div */}
        <ProductCarousel products={newArrivals} locale={locale} />
      </section>

      {/* Shop by Brand - Premium Carousel (Yellow Background) */}
      <BrandCarousel locale={locale} />

      {/* Daily Health Wisdom - Articles Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-4">
            {isRtl ? 'الحكمة الصحية اليومية' : 'Daily Health Wisdom'}
          </h2>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
            {isRtl ? 'نصائح ومقالات طبية من خبراء صيدليات شمس للعناية بصحتك وجمالك' : 'Medical tips and articles from Shams experts for your health and beauty care'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: isRtl ? 'كيف تختار الفيتامينات المناسبة لعمرك؟' : 'How to choose right vitamins for your age?',
              category: isRtl ? 'فيتامينات' : 'Vitamins',
              // Colorful vitamin supplements and pills
              img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop',
              date: '12 Feb 2026'
            },
            {
              title: isRtl ? '٥ خطوات لبشرة نضرة في فصل الشتاء' : '5 Steps for glowing skin in winter',
              category: isRtl ? 'العناية بالبشرة' : 'Skin Care',
              // Skincare products and bottles
              img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
              date: '10 Feb 2026'
            },
            {
              title: isRtl ? 'نصائح الخبراء للعناية بشعر طفلك' : 'Expert tips for your baby\'s hair care',
              category: isRtl ? 'عناية الطفل' : 'Baby Care',
              // Adorable baby feet / baby care
              img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
              date: '08 Feb 2026'
            }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6 shadow-2xl transition-all group-hover:shadow-shams-blue/20 bg-zinc-200">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-black uppercase text-zinc-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-black text-shams-blue uppercase tracking-widest">{post.date}</span>
                <h3 className="text-xl font-black text-zinc-900 mt-2 line-clamp-2 leading-snug transition-colors group-hover:text-shams-blue dark:text-white">
                  {post.title}
                </h3>
              </div>
            </div>
          ))
          }
        </div>
      </section>

      {/* Featured Values */}
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2">
            {[
              {
                icon: Heart,
                title: isRtl ? 'رعاية صحية' : 'Health Care',
                desc: isRtl ? 'أفضل الماركات العالمية' : 'Best international brands',
                color: 'bg-rose-50 text-rose-600'
              },
              {
                icon: ShieldCheck,
                title: isRtl ? 'ثقة وأمان' : 'Safe & Secure',
                desc: isRtl ? 'منتجات أصلية 100%' : '100% Original products',
                color: 'bg-blue-50 text-blue-600'
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 rounded-[32px] bg-white p-6 md:p-8 text-center transition-all hover:shadow-xl dark:bg-zinc-900 border border-zinc-50 dark:border-zinc-800">
                <div className={cn("flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl", item.color)}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
}
