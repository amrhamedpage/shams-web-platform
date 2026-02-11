import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Pill, Heart, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/app/actions/product-actions';

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const locale = lang === 'en' ? 'en' : 'ar';
  const isRtl = locale === 'ar';

  // Fetch dynamic products
  const newArrivals = await getProducts({ newArrivals: true, limit: 10 });

  return (
    <div className="flex flex-col gap-12 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <Suspense fallback={<div className="w-full h-[300px] md:h-[400px] lg:h-[480px] bg-zinc-100 animate-pulse rounded-none md:rounded-3xl mx-auto md:max-w-7xl md:mt-6" />}>
        <HeroCarousel />
      </Suspense>


      {/* Category Bento Grid */}
      <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
            {isRtl ? 'تسوق حسب الفئات' : 'Shop by Category'}
          </h2>
          <Link href={`/products?lang=${locale}`} className="text-xs md:text-sm font-bold text-shams-blue hover:underline">
            {isRtl ? 'عرض الكل' : 'View All'}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Featured Category: Medicines */}
          <Link href={`/products?category=Medicines&lang=${locale}`} className="group relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-100 col-span-2 lg:row-span-2 shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-shams-blue/20 h-48 sm:h-64 lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1200&auto=format&fit=crop&v=pharm1"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Medicines"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-blue/90 via-shams-blue/20 to-transparent z-10" />
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20">
              <h3 className="text-2xl md:text-4xl font-black text-white">{isRtl ? 'الأدوية' : 'Medicines'}</h3>
              <p className="text-white/80 text-sm md:text-lg mt-1 md:mt-2 font-medium">{isRtl ? 'كل ما تحتاجه لصحتك' : 'Everything you need for health'}</p>
            </div>
          </Link>

          {/* Skin Care / Beauty */}
          <Link href={`/products?category=Skin%20Care&lang=${locale}`} className="group relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-100 shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-shams-green/20 aspect-square sm:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403328?q=80&w=800&auto=format&fit=crop&v=pharm2"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Beauty"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-green/90 via-shams-green/10 to-transparent z-10" />
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-20">
              <h3 className="text-lg md:text-2xl font-black text-white">{isRtl ? 'جمال وصحة' : 'Beauty & Care'}</h3>
            </div>
          </Link>

          {/* Vitamins */}
          <Link href={`/products?category=Vitamins&lang=${locale}`} className="group relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-100 shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-shams-yellow/20 aspect-square sm:aspect-auto">
            <img
              src="https://images.unsplash.com/photo-1550573105-df1603baaa91?q=80&w=800&auto=format&fit=crop&v=pharm3"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Vitamins"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-yellow/90 via-shams-yellow/10 to-transparent z-10" />
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 z-20">
              <h3 className="text-lg md:text-2xl font-black text-zinc-900">{isRtl ? 'فيتامينات' : 'Vitamins'}</h3>
            </div>
          </Link>

          {/* Baby Care */}
          <Link href={`/products?category=Baby%20Care&lang=${locale}`} className="group relative col-span-2 overflow-hidden rounded-[32px] md:rounded-[40px] bg-zinc-100 shadow-xl md:shadow-2xl transition-all duration-500 min-h-[160px] sm:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=1200&auto=format&fit=crop&v=pharm4"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Baby Care"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-transparent to-transparent z-10" />
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white">{isRtl ? 'عناية الطفل متميزة' : 'Premium Baby Care'}</h3>
                <p className="text-zinc-300 text-xs md:text-lg mt-0.5 md:mt-1 font-medium italic">{isRtl ? 'أمان لطفلك' : 'Safety for your child'}</p>
              </div>
              <ArrowRight className="text-white bg-white/20 backdrop-blur-md rounded-full p-2 w-10 h-10 md:w-12 md:h-12 transition-all group-hover:bg-shams-blue group-hover:translate-x-2 flex-shrink-0" />
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals Section - Dynamic */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
            {isRtl ? 'وصل حديثاً' : 'New Arrivals'}
          </h2>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-shams-blue" />
            <div className="h-2 w-2 rounded-full bg-zinc-200" />
            <div className="h-2 w-2 rounded-full bg-zinc-200" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </section>

      {/* Shop by Brand - Horizontal Slider */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              {isRtl ? 'تسوق حسب الماركة' : 'Shop by Brand'}
            </h2>
            <div className="h-1 w-20 bg-shams-blue mt-2 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4 px-2">
          {[
            { name: 'Vichy', logo: 'https://cdn.worldvectorlogo.com/logos/vichy.svg' },
            { name: 'La Roche-Posay', logo: 'https://cdn.worldvectorlogo.com/logos/la-roche-posay.svg' },
            { name: 'CeraVe', logo: 'https://cdn.worldvectorlogo.com/logos/cerave.svg' },
            { name: 'Eucerin', logo: 'https://cdn.worldvectorlogo.com/logos/eucerin.svg' },
            { name: 'Bioderma', logo: 'https://cdn.worldvectorlogo.com/logos/bioderma.svg' },
            { name: 'Cetaphil', logo: 'https://cdn.worldvectorlogo.com/logos/cetaphil.svg' },
            { name: 'Panadol', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Panadol_logo.svg/1200px-Panadol_logo.svg.png' },
          ].map((brand, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-24 rounded-2xl bg-white shadow-lg shadow-black/5 flex items-center justify-center p-6 border border-zinc-50 hover:border-shams-blue/30 transition-all hover:scale-105 cursor-pointer dark:bg-zinc-900 dark:border-zinc-800">
              <span className="font-black text-xl text-zinc-300 group-hover:text-zinc-500 transition-colors uppercase tracking-widest">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

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
              img: 'https://images.unsplash.com/photo-1550573105-df1603baaa91?q=80&w=800&auto=format&fit=crop',
              date: '12 Feb 2026'
            },
            {
              title: isRtl ? '٥ خطوات لبشرة نضرة في فضل الشتاء' : '5 Steps for glowing skin in winter',
              category: isRtl ? 'العناية بالبشرة' : 'Skin Care',
              img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403328?q=80&w=800&auto=format&fit=crop',
              date: '10 Feb 2026'
            },
            {
              title: isRtl ? 'نصائح الخبراء للعناية بشعر طفلك' : 'Expert tips for your baby\'s hair care',
              category: isRtl ? 'عناية الطفل' : 'Baby Care',
              img: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&auto=format&fit=crop',
              date: '08 Feb 2026'
            }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-6 shadow-2xl transition-all group-hover:shadow-shams-blue/20">
                <img src={post.img} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                <div className="absolute top-6 left-6">
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
          ))}
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
