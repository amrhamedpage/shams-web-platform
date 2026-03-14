
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    {
        name_en: 'Panadol Advance 500mg',
        name_ar: 'بانادول ادفانس ٥٠٠ ملجم',
        price: 12.50,
        old_price: 15.00,
        category: 'Medicines',
        image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
        description_en: 'Effective relief from mild to moderate pain including headache, migraine, muscle ache, dysmenorrhea, sore throat, musculoskeletal pain and fever.',
        description_ar: 'تخفيف فعال للألم الخفيف إلى المتوسط بما في ذلك الصداع، والصداع النصفي، وآلام العضلات، وآلام الدورة الشهرية، والتهاب الحلق، وآلام العضلات والعظام، والحمى.',
        in_stock: true,
        barcode: '6281037020015'
    },
    {
        name_en: 'CeraVe Moisturizing Cream',
        name_ar: 'سيرـافي كريم مرطب',
        price: 85.00,
        old_price: 105.00,
        category: 'Skin Care',
        image_url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop',
        description_en: 'Rich, non-greasy, fast-absorbing moisturizing cream for normal to dry skin on the face and body.',
        description_ar: 'كريم مرطب غني، غير دهني، وسريع الامتصاص للبشرة العادية إلى الجافة للوجه والجسم.',
        in_stock: true,
        barcode: '3337875597371'
    },
    {
        name_en: 'Centrum with Lutein',
        name_ar: 'سنتروم مع لوتين',
        price: 55.00,
        old_price: 68.00,
        category: 'Vitamins',
        image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop',
        description_en: 'Complete multivitamin with Lutein for eye health.',
        description_ar: 'فيتامينات متعددة كاملة مع اللوتين لصحة العين.',
        in_stock: true,
        barcode: '6281037020022'
    },
    {
        name_en: 'Pampers Premium Care Size 3',
        name_ar: 'بامبرز عناية مميزة مقاس ٣',
        price: 92.00,
        old_price: 110.00,
        category: 'Baby Care',
        image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
        description_en: 'Softest comfort and best skin protection.',
        description_ar: 'أنعم راحة وأفضل حماية للبشرة.',
        in_stock: true,
        barcode: '4015400612344'
    },
    {
        name_en: 'La Roche-Posay Anthelios 50+',
        name_ar: 'لاروش بوزيه أنثيليوس ٥٠+',
        price: 120.00,
        old_price: 145.00,
        category: 'Skin Care',
        image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        description_en: 'Invisible fluid facial sunscreen.',
        description_ar: 'واقي شمس سائل للوجه غير مرئي.',
        in_stock: true,
        barcode: '3337875546409'
    },
    {
        name_en: 'Folic Acid 5mg',
        name_ar: 'حمض الفوليك ٥ ملجم',
        price: 18.00,
        old_price: 22.00,
        category: 'Vitamins',
        image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
        description_en: 'Essential for pregnancy and general health.',
        description_ar: 'ضروري للحمل والصحة العامة.',
        in_stock: true,
        barcode: '6281037020039'
    },
    {
        name_en: 'Vichy Mineral 89',
        name_ar: 'فيشي مينيرال ٨٩',
        price: 145.00,
        old_price: 175.00,
        category: 'Skin Care',
        image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
        description_en: 'Fortifying and plumping daily booster.',
        description_ar: 'معزز يومي لتقوية البشرة وملئها.',
        in_stock: true,
        barcode: '3337875543248'
    },
    {
        name_en: 'Vitamin C Serum',
        name_ar: 'فيتامين سي سيروم',
        price: 85.00,
        old_price: null,
        category: 'Skin Care',
        image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
        description_en: 'Brightens and evens skin tone.',
        description_ar: 'يفتح ويوحد لون البشرة.',
        in_stock: true,
        barcode: '6281037020046'
    },
    {
        name_en: 'Omega 3 Fish Oil',
        name_ar: 'أوميغا ٣ زيت السمك',
        price: 65.00,
        old_price: 80.00,
        category: 'Vitamins',
        image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop',
        description_en: 'Supports heart, brain and eye health.',
        description_ar: 'يدعم صحة القلب والدماغ والعين.',
        in_stock: true,
        barcode: '6281037020053'
    },
    {
        name_en: 'Baby Wipes Sensitive',
        name_ar: 'مناديل مبللة للأطفال حساسة',
        price: 25.00,
        old_price: 35.00,
        category: 'Baby Care',
        image_url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
        description_en: 'Gentle cleaning for delicate skin.',
        description_ar: 'تنظيف لطيف للبشرة الحساسة.',
        in_stock: true,
        barcode: '4015400612351'
    }
];

async function seed() {
    console.log('🌱 Starting seed...');

    // 1. Clear existing data (optional, but safer for demo)
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
        console.error('Error clearing table:', deleteError.message);
        // Proceeding anyway as table might be empty or permissions might block delete all
    } else {
        console.log('🧹 Cleared existing products.');
    }

    // 2. Insert new data
    const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select();

    if (error) {
        console.error('❌ Error seeding data:', error.message);
    } else {
        console.log(`✅ Successfully seeded ${data.length} products!`);
    }
}

seed();
