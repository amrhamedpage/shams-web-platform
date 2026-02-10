'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Pill, Activity, Zap, Moon, Brain, ChevronRight, Loader2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    id: string;
    text: { ar: string; en: string };
    options: {
        id: string;
        text: { ar: string; en: string };
        icon: any;
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 'goal',
        text: { ar: 'ما هو هدفك الصحي الأساسي؟', en: 'What is your primary health goal?' },
        options: [
            { id: 'immunity', text: { ar: 'تقوية المناعة', en: 'Boost Immunity' }, icon: Shield },
            { id: 'energy', text: { ar: 'زيادة الطاقة', en: 'More Energy' }, icon: Zap },
            { id: 'stress', text: { ar: 'تقليل التوتر', en: 'Reduce Stress' }, icon: Brain },
            { id: 'sleep', text: { ar: 'تحسين النوم', en: 'Better Sleep' }, icon: Moon },
        ]
    },
    {
        id: 'lifestyle',
        text: { ar: 'كيف تصف نمط حياتك؟', en: 'How would you describe your lifestyle?' },
        options: [
            { id: 'active', text: { ar: 'نشط جداً', en: 'Very Active' }, icon: Activity },
            { id: 'sedentary', text: { ar: 'جلوس طويل', en: 'Mostly Sitting' }, icon: Pill },
        ]
    }
];

// Re-using Pill for icon if Shield is not in scope, but let's assume common icons
import { Shield } from 'lucide-react';

export function AIHealthAdvisor({ locale = 'ar' }: { locale?: 'ar' | 'en' }) {
    const [step, setStep] = useState<'intro' | 'quiz' | 'analyzing' | 'result'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const isRtl = locale === 'ar';

    const handleAnswer = (questionId: string, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            startAnalysis();
        }
    };

    const startAnalysis = async () => {
        setStep('analyzing');
        await new Promise(resolve => setTimeout(resolve, 2500));
        setStep('result');
    };

    return (
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-zinc-900" dir={isRtl ? 'rtl' : 'ltr'}>
            {step === 'intro' && (
                <div className="flex flex-col md:flex-row min-h-[500px]">
                    <div className="flex flex-1 flex-col justify-center p-8 lg:p-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-shams-blue/5 px-4 py-1 text-sm font-bold text-shams-blue dark:bg-shams-blue/20 dark:text-shams-blue">
                            <Sparkles size={16} />
                            <span>{isRtl ? 'جديد: مستشار شمس الذكي' : 'New: Shams AI Advisor'}</span>
                        </div>
                        <h2 className="mt-6 text-4xl font-black text-zinc-900 dark:text-white lg:text-5xl">
                            {isRtl ? 'اكتشف روتينك' : 'Discover Your'} <br />
                            <span className="text-shams-blue">{isRtl ? 'الصحي المثالي' : 'Perfect Routine'}</span>
                        </h2>
                        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                            {isRtl
                                ? 'أجب على 3 أسئلة بسيطة وسيقوم نظامنا المدعوم بالذكاء الاصطناعي بتصميم روتين فيتامينات مخصص لك.'
                                : 'Answer 3 simple questions and our AI-powered system will design a personalized vitamin routine just for you.'}
                        </p>
                        <button
                            onClick={() => setStep('quiz')}
                            className="mt-10 flex items-center justify-center gap-2 self-start rounded-2xl bg-shams-blue px-8 py-4 text-lg font-bold text-white transition-all hover:bg-shams-blue/90 active:scale-95 shadow-xl shadow-shams-blue/20"
                        >
                            {isRtl ? 'ابدأ الآن' : 'Get Started'}
                            <ArrowRight className={isRtl ? 'rotate-180' : ''} size={20} />
                        </button>
                    </div>
                    <div className="relative hidden bg-shams-blue md:block md:w-2/5">
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                            <Activity size={300} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            )}

            {step === 'quiz' && (
                <div className="p-8 lg:p-16 min-h-[500px] flex flex-col justify-center">
                    <div className="mb-12">
                        <div className="flex justify-between text-xs font-bold text-zinc-400">
                            <span>{isRtl ? `خطوة ${currentQuestion + 1} من ${QUESTIONS.length}` : `Step ${currentQuestion + 1} of ${QUESTIONS.length}`}</span>
                            <span>{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <div
                                className="h-full rounded-full bg-shams-blue transition-all duration-500"
                                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-10">
                        {QUESTIONS[currentQuestion].text[locale]}
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {QUESTIONS[currentQuestion].options.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleAnswer(QUESTIONS[currentQuestion].id, opt.id)}
                                className="group flex items-center gap-6 rounded-3xl border-2 border-zinc-100 p-6 text-right transition-all hover:border-shams-blue hover:bg-shams-blue/5 dark:border-zinc-800 dark:hover:bg-shams-blue/10"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-600 transition-colors group-hover:bg-shams-blue group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400">
                                    <opt.icon size={24} />
                                </div>
                                <span className="flex-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{opt.text[locale]}</span>
                                <ChevronRight className={cn("text-zinc-200 group-hover:text-shams-blue", isRtl && "rotate-180")} size={24} />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'analyzing' && (
                <div className="flex min-h-[500px] flex-col items-center justify-center p-16 text-center">
                    <div className="relative mb-8">
                        <div className="h-24 w-24 rounded-full border-4 border-zinc-100 dark:border-zinc-800" />
                        <Loader2 className="absolute inset-0 h-24 w-24 animate-spin text-shams-blue" />
                        <Brain className="absolute inset-0 m-auto text-shams-blue" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {isRtl ? 'جاري تحليل بياناتك...' : 'Analyzing your profile...'}
                    </h3>
                    <p className="mt-2 text-zinc-500">
                        {isRtl ? 'نحن نبحث عن أفضل المنتجات لك' : 'We are searching for the best products for you'}
                    </p>
                </div>
            )}

            {step === 'result' && (
                <div className="p-8 lg:p-16">
                    <div className="mb-10 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-shams-green/10 text-shams-green">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="mt-4 text-3xl font-black text-zinc-900 dark:text-white">
                            {isRtl ? 'روتينك المخصص جاهز!' : 'Your Personalized Routine!'}
                        </h3>
                        <p className="mt-2 text-zinc-500">
                            {isRtl ? 'بناءً على إجاباتك، نوصي بالمجموعة التالية:' : 'Based on your answers, we recommend this bundle:'}
                        </p>
                    </div>

                    <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="flex flex-1 items-center gap-6">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-800">
                                    <Pill size={32} className="text-shams-blue" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                                        {isRtl ? 'باقة الطاقة والمناعة القصوى' : 'Ultimate Energy & Immunity Bundle'}
                                    </h4>
                                    <p className="text-sm text-zinc-500">
                                        {isRtl ? 'تشمل: فيتامين سي، أوميغا 3، كومبلكس ب' : 'Includes: Vitamin C, Omega 3, B-Complex'}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <div className="text-3xl font-black text-shams-blue">249.00 {isRtl ? 'ر.س' : 'SAR'}</div>
                                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-shams-blue px-8 py-3 font-bold text-white transition-all hover:bg-shams-blue/90 dark:text-white">
                                    <ShoppingCart size={20} />
                                    {isRtl ? 'أضف الباقة للسلة' : 'Add Bundle to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { setStep('intro'); setCurrentQuestion(0); }}
                        className="mx-auto mt-8 block text-sm font-bold text-zinc-400 hover:text-shams-blue"
                    >
                        {isRtl ? 'إعادة الاختبار' : 'Retake Quiz'}
                    </button>
                </div>
            )}
        </div>
    );
}
