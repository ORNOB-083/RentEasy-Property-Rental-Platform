export default function PropertySkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] animate-pulse">
            <div className="aspect-[4/3] w-full bg-[#F3EFF9] dark:bg-[#150C22]" />
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="h-4 w-3/4 rounded bg-[#F3EFF9] dark:bg-[#150C22]" />
                <div className="h-3 w-full rounded bg-[#F3EFF9] dark:bg-[#150C22]" />
                <div className="h-3 w-1/2 rounded bg-[#F3EFF9] dark:bg-[#150C22]" />
                <div className="mt-2 h-8 w-full rounded-full bg-[#F3EFF9] dark:bg-[#150C22]" />
            </div>
        </div>
    );
}