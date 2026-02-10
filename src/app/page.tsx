import Link from 'next/link';
import { ArrowRight, Pill, Heart, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const locale = lang === 'en' ? 'en' : 'ar';
  const isRtl = locale === 'ar';

  return (
    <div className="flex flex-col gap-12 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-20 pt-24 dark:bg-black lg:min-h-[80vh] lg:flex lg:items-center">
        {/* Background Accents (Subtle) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-shams-blue/5 blur-[120px] dark:bg-shams-blue/20" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text Content: Reverted to original dark/blue style */}
            <div className={cn("flex flex-col gap-6 text-center", isRtl ? "lg:text-right" : "lg:text-left")}>
              <div className="inline-flex items-center gap-2 self-center rounded-full bg-shams-blue/5 px-4 py-1.5 text-sm font-extrabold text-shams-blue ring-1 ring-shams-blue/20 dark:bg-shams-blue/30 lg:self-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-shams-blue opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-shams-blue"></span>
                </span>
                <span>{isRtl ? 'صيدلية موثوقة في المملكة' : 'Trusted Pharmacy in KSA'}</span>
              </div>
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
                {isRtl ? 'صحتك، هي' : 'Your Health,'} <br />
                <span className="text-shams-blue">
                  {isRtl ? 'الأولوية الأكبر' : 'Our Biggest Priority'}
                </span>
              </h1>
              <p className="max-w-lg mx-auto text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 lg:mx-0">
                {isRtl
                  ? 'تسوق أفضل منتجات الصحة والجمال والأدوية مع تجربة رقمية فريدة تليق بك.'
                  : 'Shop the best health, beauty and medical products with a unique digital experience designed for you.'}
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href={`/products?lang=${locale}`}
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-shams-blue px-10 py-5 text-lg font-black text-white transition-all hover:bg-shams-blue/90 active:scale-95 shadow-2xl shadow-shams-blue/40"
                >
                  {isRtl ? 'تسوق الآن' : 'Shop Now'}
                  <ArrowRight className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} size={22} />
                </Link>
                <div className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-zinc-500 font-bold dark:text-zinc-400">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
                      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop'
                    ].map((src, i) => (
                      <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-zinc-100 dark:border-zinc-800">
                        <img src={src} className="h-full w-full object-cover" alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold ml-2">{isRtl ? '50ك+ عميل مرتاح' : '50k+ Happy Customers'}</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Panel: Clear and impactful side-by-side photo */}
            <div className="relative hidden lg:block h-[500px] w-full">
              <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-shams-blue to-[#10ACDC] rotate-3 opacity-10" />
              <div className="absolute inset-0 overflow-hidden rounded-[60px] border-[12px] border-white bg-white shadow-2xl dark:border-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop"
                  alt="Modern Pharmacy Visual"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-12">
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-white/20 p-4 backdrop-blur-xl ring-1 ring-white/30">
                    <div className="h-12 w-12 rounded-full bg-shams-blue flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="text-white">
                      <p className="text-sm font-bold opacity-80">{isRtl ? 'رعاية معتمدة' : 'Certified Care'}</p>
                      <p className="text-sm font-black">{isRtl ? 'وزارة الصحة' : 'MOH Approved'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Category Bento Grid */}
      <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
            {isRtl ? 'تسوق حسب الفئات' : 'Shop by Category'}
          </h2>
          <Link href={`/products?lang=${locale}`} className="text-sm font-bold text-shams-blue hover:underline">
            {isRtl ? 'عرض الكل' : 'View All'}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {/* Featured Category: Medicines */}
          <Link href={`/products?category=Medicines&lang=${locale}`} className="group relative overflow-hidden rounded-[40px] bg-zinc-100 lg:col-span-2 lg:row-span-2 shadow-2xl transition-all duration-500 hover:shadow-shams-blue/20">
            <img
              src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1200&auto=format&fit=crop&v=pharm1"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Medicines"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-blue/90 via-shams-blue/20 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <h3 className="text-4xl font-black text-white">{isRtl ? 'الأدوية' : 'Medicines'}</h3>
              <p className="text-white/80 text-lg mt-2 font-medium">{isRtl ? 'كل ما تحتاجه لصحتك' : 'Everything you need for health'}</p>
            </div>
          </Link>

          {/* Skin Care / Beauty */}
          <Link href={`/products?category=Skin%20Care&lang=${locale}`} className="group relative overflow-hidden rounded-[40px] bg-zinc-100 shadow-2xl transition-all duration-500 hover:shadow-shams-green/20">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403328?q=80&w=800&auto=format&fit=crop&v=pharm2"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Beauty"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-green/90 via-shams-green/10 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-2xl font-black text-white">{isRtl ? 'جمال وصحة' : 'Beauty & Care'}</h3>
            </div>
          </Link>

          {/* Vitamins */}
          <Link href={`/products?category=Vitamins&lang=${locale}`} className="group relative overflow-hidden rounded-[40px] bg-zinc-100 shadow-2xl transition-all duration-500 hover:shadow-shams-yellow/20">
            <img
              src="https://images.unsplash.com/photo-1550573105-df1603baaa91?q=80&w=800&auto=format&fit=crop&v=pharm3"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Vitamins"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shams-yellow/90 via-shams-yellow/10 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-2xl font-black text-zinc-900">{isRtl ? 'فيتامينات' : 'Vitamins'}</h3>
            </div>
          </Link>

          {/* Baby Care */}
          <Link href={`/products?category=Baby%20Care&lang=${locale}`} className="group relative col-span-2 lg:col-span-2 overflow-hidden rounded-[40px] bg-zinc-100 shadow-2xl transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=1200&auto=format&fit=crop&v=pharm4"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Baby Care"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-transparent to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black text-white">{isRtl ? 'عناية الطفل متميزة' : 'Premium Baby Care'}</h3>
                <p className="text-zinc-300 text-lg mt-1 font-medium">{isRtl ? 'أمان لطفلك' : 'Safety for your child'}</p>
              </div>
              <ArrowRight className="text-white bg-white/20 backdrop-blur-md rounded-full p-2 w-12 h-12 transition-all group-hover:bg-shams-blue group-hover:translate-x-2" />
            </div>
          </Link>
        </div>
      </section>

      {/* Trending Products */}
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: isRtl ? 'بانادول ادفانس' : 'Panadol Advance', price: '12.50 SAR', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&h=400&fit=crop&v=prod_fix_1' },
            { name: isRtl ? 'سيروم فيتامين سي' : 'Vitamin C Serum', price: '85.00 SAR', img: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=400&h=400&fit=crop&v=prod_fix_2' },
            { name: isRtl ? 'شامبو اطفال' : 'Baby Shampoo', price: '45.00 SAR', img: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=400&h=400&fit=crop&v=prod_fix_3' },
            { name: isRtl ? 'فوليك اسيد' : 'Folic Acid', price: '18.00 SAR', img: 'https://images.unsplash.com/photo-1471864190281-ad5fe9bb0720?q=80&w=400&h=400&fit=crop&v=prod_fix_4' },
            { name: isRtl ? 'كريم مرطب' : 'Moisturizer Cream', price: '120.00 SAR', img: 'https://images.unsplash.com/photo-1601049541289-9b1b7abcad59?q=80&w=400&h=400&fit=crop&v=prod_fix_5' },
          ].map((product, i) => (
            <div key={i} className="group relative flex flex-col gap-4 rounded-[32px] bg-white p-4 shadow-xl shadow-black/5 transition-all hover:-translate-y-1 hover:shadow-shams-blue/10 dark:bg-zinc-900">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50">
                <img src={product.img} className="h-full w-full object-cover transition-transform group-hover:scale-110" alt={product.name} />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 p-2 text-shams-blue backdrop-blur-sm shadow-sm">
                  <Heart size={16} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-1">{product.name}</h4>
                <p className="text-shams-blue font-black">{product.price}</p>
              </div>
              <button className="w-full rounded-xl bg-zinc-100 py-3 text-sm font-black transition-all hover:bg-shams-blue hover:text-white dark:bg-zinc-800">
                {isRtl ? 'أضف للسلة' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Values */}
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
              <div key={i} className="flex flex-col items-center gap-4 rounded-[32px] bg-white p-8 text-center transition-all hover:shadow-xl dark:bg-zinc-900">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl", item.color)}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
