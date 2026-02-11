export interface SubCategory {
    name_ar: string;
    name_en: string;
    href: string;
}

export interface Category {
    id: string;
    name_ar: string;
    name_en: string;
    icon?: string;
    subCategories: SubCategory[];
}

export const CATEGORIES: Category[] = [
    {
        id: 'fragrances',
        name_ar: 'العطور',
        name_en: 'Fragrances',
        subCategories: [
            { name_ar: 'عطور الرجال', name_en: 'Men Fragrances', href: '/products?category=Fragrances&sub=Men' },
            { name_ar: 'عطور النساء', name_en: 'Women Fragrances', href: '/products?category=Fragrances&sub=Women' },
            { name_ar: 'عطور الأطفال', name_en: 'Kids Fragrances', href: '/products?category=Fragrances&sub=Kids' },
        ]
    },
    {
        id: 'makeup',
        name_ar: 'المكياج',
        name_en: 'Makeup',
        subCategories: [
            { name_ar: 'أحمر الشفاه', name_en: 'Lipstick', href: '/products?category=Skin Care&sub=Lipstick' },
            { name_ar: 'مكياج العين', name_en: 'Eye Makeup', href: '/products?category=Skin Care&sub=Eye' },
            { name_ar: 'مكياج الوجه', name_en: 'Face Makeup', href: '/products?category=Skin Care&sub=Face' },
            { name_ar: 'طلاء الأظافر', name_en: 'Nail Colors', href: '/products?category=Skin Care&sub=Nails' },
            { name_ar: 'رموش صناعية', name_en: 'Eye Lashes', href: '/products?category=Skin Care&sub=Lashes' },
            { name_ar: 'عدسات لاصقة', name_en: 'Contact Lenses', href: '/products?category=Skin Care&sub=Lenses' },
            { name_ar: 'أدوات المكياج', name_en: 'Makeup Tools', href: '/products?category=Skin Care&sub=Tools' },
            { name_ar: 'أقراط', name_en: 'Earrings', href: '/products?category=Skin Care&sub=Earrings' },
            { name_ar: 'اكسسوارات التجميل', name_en: 'Beauty Accessories', href: '/products?category=Skin Care&sub=Accessories' },
        ]
    },
    {
        id: 'baby-care',
        name_ar: 'عناية الطفل وحفاضات',
        name_en: 'Baby Care & Diapers',
        subCategories: [
            { name_ar: 'حفاضات', name_en: 'Diapers', href: '/products?category=Baby Care&sub=Diapers' },
            { name_ar: 'مناديل مبللة', name_en: 'Wipes', href: '/products?category=Baby Care&sub=Wipes' },
            { name_ar: 'عناية ببشرة الطفل', name_en: 'Baby Skin Care', href: '/products?category=Baby Care&sub=Skin' },
        ]
    },
    {
        id: 'vitamins',
        name_ar: 'الفيتامينات',
        name_en: 'Vitamins',
        subCategories: [
            { name_ar: 'فيتامينات متعددة', name_en: 'Multivitamins', href: '/products?category=Vitamins&sub=Multi' },
            { name_ar: 'مقويات المناعة', name_en: 'Immunity Boosters', href: '/products?category=Vitamins&sub=Immunity' },
            { name_ar: 'معادن', name_en: 'Minerals', href: '/products?category=Vitamins&sub=Minerals' },
        ]
    },
    {
        id: 'skin-care',
        name_ar: 'عناية بالبشرة',
        name_en: 'Skin Care',
        subCategories: [
            { name_ar: 'منظفات الوجه', name_en: 'Face Cleansers', href: '/products?category=Skin Care&sub=Cleansers' },
            { name_ar: 'مرطبات', name_en: 'Moisturizers', href: '/products?category=Skin Care&sub=Moisturizers' },
            { name_ar: 'واقي شمس', name_en: 'Sunscreen', href: '/products?category=Skin Care&sub=Sunscreen' },
        ]
    },
    {
        id: 'baby-accessories',
        name_ar: 'اكسسوارات الطفل',
        name_en: 'Baby Accessories',
        subCategories: [
            { name_ar: 'رضاعات', name_en: 'Feeding Bottles', href: '/products?category=Baby Care&sub=Bottles' },
            { name_ar: 'لهايات', name_en: 'Pacifiers', href: '/products?category=Baby Care&sub=Pacifiers' },
        ]
    },
    {
        id: 'hair-care',
        name_ar: 'عناية بالشعر',
        name_en: 'Hair Care',
        subCategories: [
            { name_ar: 'شامبو', name_en: 'Shampoo', href: '/products?category=Personal Care&sub=Shampoo' },
            { name_ar: 'بلسم', name_en: 'Conditioner', href: '/products?category=Personal Care&sub=Conditioner' },
            { name_ar: 'صبغة شعر', name_en: 'Hair Color', href: '/products?category=Personal Care&sub=Color' },
        ]
    },
    {
        id: 'personal-care',
        name_ar: 'العناية الشخصية',
        name_en: 'Personal Care',
        subCategories: [
            { name_ar: 'عناية بالفم', name_en: 'Oral Care', href: '/products?category=Personal Care&sub=Oral' },
            { name_ar: 'مزيلات عرق', name_en: 'Deodorants', href: '/products?category=Personal Care&sub=Deo' },
            { name_ar: 'عناية بالجسم', name_en: 'Body Care', href: '/products?category=Personal Care&sub=Body' },
        ]
    },
    {
        id: 'baby-milk',
        name_ar: 'حليب وطعام الطفل',
        name_en: 'Baby Milk & Food',
        subCategories: [
            { name_ar: 'حليب صناعي', name_en: 'Baby Formula', href: '/products?category=Baby care&sub=Formula' },
            { name_ar: 'طعام أطفال', name_en: 'Baby Food', href: '/products?category=Baby care&sub=Food' },
        ]
    },
    {
        id: 'sport-nutrition',
        name_ar: 'تغذية رياضية',
        name_en: 'Sport Nutrition',
        subCategories: [
            { name_ar: 'بروتين', name_en: 'Protein', href: '/products?category=Vitamins&sub=Protein' },
            { name_ar: 'أحماض أمينية', name_en: 'Amino Acids', href: '/products?category=Vitamins&sub=Amino' },
        ]
    },
    {
        id: 'healthy-devices',
        name_ar: 'أجهزة صحية',
        name_en: 'Healthy Devices',
        subCategories: [
            { name_ar: 'أجهزة ضغط', name_en: 'Blood Pressure', href: '/products?category=Medical Equipment&sub=Pressure' },
            { name_ar: 'أجهزة سكر', name_en: 'Glucose Monitors', href: '/products?category=Medical Equipment&sub=Glucose' },
        ]
    },
    {
        id: 'healthy-nutrition',
        name_ar: 'تغذية صحية',
        name_en: 'Healthy Nutrition',
        subCategories: [
            { name_ar: 'أغذية عضوية', name_en: 'Organic Food', href: '/products?category=Vitamins&sub=Organic' },
            { name_ar: 'بدائل سكر', name_en: 'Sugar Substitutes', href: '/products?category=Vitamins&sub=Sugar' },
        ]
    },
    {
        id: 'home-care',
        name_ar: 'رعاية صحية منزلية',
        name_en: 'Home Health Care',
        subCategories: [
            { name_ar: 'كراسي متحركة', name_en: 'Wheelchairs', href: '/products?category=Medical Equipment&sub=Wheelchairs' },
            { name_ar: 'عكازات', name_en: 'Crutches', href: '/products?category=Medical Equipment&sub=Crutches' },
        ]
    },
];

export const NAV_LINKS = [
    { name_ar: 'عروض خاطفة', name_en: 'Flash Sales', icon: '⚡' },
    { name_ar: 'نشرة العروض', name_en: 'Promo Flyer', icon: '🛍️' },
];
