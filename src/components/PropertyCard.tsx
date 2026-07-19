"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, MapPin } from "lucide-react";

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
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6]">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 rounded-full bg-[#9B4DCA]/90 dark:bg-[#8B5CF6]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {propertyType}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-[#1A1528] dark:text-[#F5F3FF] line-clamp-1">
                    {title}
                </h3>
                <p className="mt-1 text-sm text-[#585470] dark:text-[#A79FBB] line-clamp-2">
                    {shortDescription}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs text-[#585470] dark:text-[#A79FBB]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="mt-2 flex items-center gap-4 text-xs text-[#585470] dark:text-[#A79FBB]">
                    <span className="flex items-center gap-1">
                        <BedDouble className="h-3.5 w-3.5" /> {bedrooms} Bed
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" /> {bathrooms} Bath
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#9B4DCA] dark:text-[#8B5CF6]">
                        ৳{price.toLocaleString()}
                        <span className="text-xs font-normal text-[#585470] dark:text-[#A79FBB]">/mo</span>
                    </span>
                    <Link
                        href={`/properties/${id}`}
                        className="rounded-full bg-[#9B4DCA] dark:bg-[#8B5CF6] px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-[#8A3EBA] dark:hover:bg-[#7C3AED] active:scale-95"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}