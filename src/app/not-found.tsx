"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import loaderCat from "../../public/Loader-cat.json";

export default function NotFound() {
    return (
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#FAF9FC] dark:bg-cyan-800 transition-colors duration-300 text-center overflow-hidden">

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <h1 className="text-[18rem] lg:text-[28rem] font-black tracking-tighter text-[#9B4DCA]/10 dark:text-amber-50/10 leading-none">
                    404
                </h1>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl">

                <div className="w-80 h-80 md:w-md md:h-112 mb-4 md:mb-6 drop-shadow-2xl">
                    <Lottie
                        animationData={loaderCat}
                        loop={true}
                        autoplay={true}
                        className="w-full h-full"
                    />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1528] dark:text-[#F5F3FF]">
                    Page Not Found
                </h2>

                <p className="mt-2 text-lg text-[#585470] dark:text-[#A79FBB]">
                    Oops! The page you are looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-block rounded-full bg-[#9B4DCA] px-8 py-3.5 text-[16px] font-medium text-[#FFFFFF] shadow-md transition-all duration-200 hover:bg-[#8A3EBA] hover:shadow-lg active:scale-95 dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}