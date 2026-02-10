import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={cn("animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800", className)} />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-full" />
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
