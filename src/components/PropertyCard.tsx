"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, MapPin, ArrowRight } from "lucide-react";

interface PropertyCardProps {
    id: string;
    title: string;
    shortDescription: string;
    price: number;
    location: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    image: string;
}

export default function PropertyCard({
    id, title, shortDescription, price, location, propertyType, bedrooms, bathrooms, image,
}: PropertyCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[#9B4DCA]/20 hover:shadow-2xl hover:border-[#9B4DCA] dark:hover:shadow-[#8B5CF6]/20 dark:hover:border-[#8B5CF6]">

            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                <span className="absolute top-3 left-3 rounded-full bg-[#9B4DCA]/90 dark:bg-[#8B5CF6]/90 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                    {propertyType}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-[#1A1528] dark:text-[#F5F3FF] line-clamp-1">
                    {title}
                </h3>

                <p className="mt-1.5 text-sm text-[#585470] dark:text-[#A79FBB] line-clamp-2">
                    {shortDescription}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#585470] dark:text-[#A79FBB]">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="mt-2 flex items-center gap-4 text-xs font-medium text-[#585470] dark:text-[#A79FBB]">
                    <span className="flex items-center gap-1.5">
                        <BedDouble className="h-4 w-4 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                        {bedrooms} {bedrooms > 1 ? "Beds" : "Bed"}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                        {bathrooms} {bathrooms > 1 ? "Baths" : "Bath"}
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#2D2140]">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-[#9B4DCA] dark:text-[#8B5CF6]">
                            ৳{price.toLocaleString()}
                        </span>
                        <span className="-mt-0.5 text-[10px] font-medium text-[#585470] dark:text-[#A79FBB] uppercase tracking-widest">
                            Per Month
                        </span>
                    </div>
                    <Link
                        href={`/properties/${id}`}
                        className="flex items-center gap-2 rounded-full bg-[#9B4DCA] dark:bg-[#8B5CF6] px-4 py-2.5 text-xs font-medium text-white transition-all duration-200 hover:bg-[#8A3EBA] dark:hover:bg-[#7C3AED] hover:shadow-md active:scale-95"
                    >
                        View Details
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}