export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9FC] dark:bg-[#0D0716]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-[#9B4DCA]/15 dark:border-[#8B5CF6]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#9B4DCA] dark:border-t-[#8B5CF6] animate-spin" />
                    <div
                        className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#2DD4BF] animate-spin"
                        style={{ animationDuration: "0.6s", animationDirection: "reverse" }}
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold">
                        <span className="text-[#1A1528] dark:text-[#F5F3FF]">RentEasy</span>
                        <span className="text-[#9B4DCA] dark:text-[#8B5CF6]">BD</span>
                    </span>
                    <span className="text-xs text-[#585470] dark:text-[#A79FBB]">
                        Finding your dream home...
                    </span>
                </div>
            </div>
        </div>
    );
}
