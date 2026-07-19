"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/axios";
import PropertyCard from "@/components/PropertyCard";
import PropertySkeleton from "@/components/PropertySkeleton";

interface Property {
    _id: string;
    title: string;
    shortDescription: string;
    price: number;
    location: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    images: string[];
}

const propertyTypes = ["Apartment", "Studio", "Family Flat", "Bachelor Room", "Sublet", "Commercial"];

export default function ExploreClient() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/api/properties", {
                params: { search, propertyType, bedrooms, sortBy, page, limit: 8 },
            });
            setProperties(data.data.properties);
            setTotalPages(data.data.pagination.totalPages);
        } catch {
            setProperties([]);
        } finally {
            setLoading(false);
        }
    }, [search, propertyType, bedrooms, sortBy, page]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProperties();
    }, [fetchProperties]);

    return (
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 lg:px-8">

            <div className="relative w-full h-[33vh] overflow-hidden rounded-2xl mb-8 group">
                <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop"
                    alt="Find your perfect rental property in Dhaka"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1528]/90 via-[#1A1528]/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
                        Find Your Perfect <br />
                        <span className="text-[#9B4DCA]">Rental Home</span> in Dhaka
                    </h2>
                    <p className="mt-2 text-white/90 text-sm md:text-base max-w-md">
                        Browse from hundreds of verified listings across the city.
                    </p>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-[#1A1528] dark:text-[#F5F3FF] mb-2">
                Explore Properties
            </h1>
            <p className="text-[#585470] dark:text-[#A79FBB] mb-6">
                Browse rental listings across Dhaka.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#585470] dark:text-[#A79FBB]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search by area (e.g. Dhanmondi, Mirpur)..."
                        className="w-full rounded-full border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] pl-11 pr-4 py-3 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none transition-colors"
                    />
                </div>
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-[#E5E7EB] dark:border-[#2D2140] px-5 py-3 text-sm font-medium text-[#1A1528] dark:text-[#F5F3FF] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] transition-colors"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {showFilters && (
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] p-4">
                    <select
                        value={propertyType}
                        onChange={(e) => { setPropertyType(e.target.value); setPage(1); }}
                        className="rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none"
                    >
                        <option value="">All Property Types</option>
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <select
                        value={bedrooms}
                        onChange={(e) => { setBedrooms(e.target.value); setPage(1); }}
                        className="rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none"
                    >
                        <option value="">Any Bedrooms</option>
                        {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>{n}+ Bedroom{n > 1 ? "s" : ""}</option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                        className="rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => <PropertySkeleton key={i} />)
                    : properties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            shortDescription={property.shortDescription}
                            price={property.price}
                            location={property.location}
                            propertyType={property.propertyType}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            image={property.images[0]}
                        />
                    ))}
            </div>

            {!loading && properties.length === 0 && (
                <p className="text-center text-[#585470] dark:text-[#A79FBB] py-16">
                    No properties found matching your filters.
                </p>
            )}

            {!loading && totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-2 text-[#1A1528] dark:text-[#F5F3FF] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] disabled:opacity-40 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-[#585470] dark:text-[#A79FBB]">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-2 text-[#1A1528] dark:text-[#F5F3FF] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] disabled:opacity-40 transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}