"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Heart, BedDouble, Bath, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import BookingModal from "@/components/BookingModal"; 

interface Property {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    location: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    furnishingStatus: string;
    amenities: string[];
    images: string[];
    posterName: string;
    posterEmail: string;
    posterPhone: string;
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [saved, setSaved] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data } = await api.get(`/api/properties/${id}`);
                setProperty(data.data);
            } catch {
                toast.error("Property not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleBookNow = () => {
        if (!session?.user) {
            toast.error("Please log in to request a booking.");
            router.push(`/login?redirect=/properties/${id}`);
            return;
        }
        setShowBookingModal(true);
    };

    const handleToggleSave = () => {
        if (!session?.user) {
            toast.error("Please log in to save properties.");
            router.push(`/login?redirect=/properties/${id}`);
            return;
        }
        setSaved((prev) => !prev);
        // TODO: call /api/saved endpoint once the Saved module is built
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#9B4DCA] dark:text-[#8B5CF6]" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-[#585470] dark:text-[#A79FBB]">Property not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                    <Image
                        src={property.images[activeImage]}
                        alt={property.title}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>
                {property.images.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                        {property.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${activeImage === i
                                    ? "border-[#9B4DCA] dark:border-[#8B5CF6]"
                                    : "border-transparent hover:border-[#9B4DCA]/50 dark:hover:border-[#8B5CF6]/50"
                                    }`}
                            >
                                <Image src={img} alt="" fill unoptimized className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="inline-block rounded-full bg-[#9B4DCA]/10 dark:bg-[#8B5CF6]/20 px-3 py-1 text-xs font-medium text-[#9B4DCA] dark:text-[#8B5CF6] mb-2">
                                {property.propertyType}
                            </span>
                            <h1 className="text-2xl font-bold text-[#1A1528] dark:text-[#F5F3FF]">
                                {property.title}
                            </h1>
                            <div className="mt-1 flex items-center gap-1 text-sm text-[#585470] dark:text-[#A79FBB]">
                                <MapPin className="h-4 w-4" />
                                {property.location}
                            </div>
                        </div>
                        <button
                            onClick={handleToggleSave}
                            aria-label="Save property"
                            className="shrink-0 rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-3 transition-all hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] hover:scale-110 active:scale-95"
                        >
                            <Heart
                                className={`h-5 w-5 transition-colors ${saved ? "fill-[#9B4DCA] text-[#9B4DCA] dark:fill-[#8B5CF6] dark:text-[#8B5CF6]" : "text-[#585470] dark:text-[#A79FBB]"
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center gap-6 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] p-4">
                        <span className="flex items-center gap-2 text-sm text-[#1A1528] dark:text-[#F5F3FF]">
                            <BedDouble className="h-4 w-4 text-[#9B4DCA] dark:text-[#8B5CF6]" /> {property.bedrooms} Bedrooms
                        </span>
                        <span className="flex items-center gap-2 text-sm text-[#1A1528] dark:text-[#F5F3FF]">
                            <Bath className="h-4 w-4 text-[#9B4DCA] dark:text-[#8B5CF6]" /> {property.bathrooms} Bathrooms
                        </span>
                        <span className="text-sm text-[#1A1528] dark:text-[#F5F3FF]">
                            {property.furnishingStatus}
                        </span>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#1A1528] dark:text-[#F5F3FF] mb-2">
                            Description
                        </h2>
                        <p className="text-sm leading-relaxed text-[#585470] dark:text-[#A79FBB]">
                            {property.fullDescription}
                        </p>
                    </div>

                    {property.amenities.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-[#1A1528] dark:text-[#F5F3FF] mb-2">
                                Amenities
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((amenity) => (
                                    <span
                                        key={amenity}
                                        className="rounded-full border border-[#E5E7EB] dark:border-[#2D2140] px-3 py-1.5 text-xs text-[#585470] dark:text-[#A79FBB]"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] p-6 shadow-sm">
                        <p className="text-2xl font-bold text-[#9B4DCA] dark:text-[#8B5CF6]">
                            ৳{property.price.toLocaleString()}
                            <span className="text-sm font-normal text-[#585470] dark:text-[#A79FBB]">/month</span>
                        </p>

                        <button
                            onClick={handleBookNow}
                            className="mt-4 w-full rounded-full bg-[#9B4DCA] dark:bg-[#8B5CF6] py-3 text-sm font-medium text-white transition-all hover:bg-[#8A3EBA] dark:hover:bg-[#7C3AED] active:scale-95"
                        >
                            Request to Book
                        </button>

                        <div className="mt-5 border-t border-[#E5E7EB] dark:border-[#2D2140] pt-5">
                            <p className="text-xs font-medium text-[#585470] dark:text-[#A79FBB] mb-2">Posted by</p>
                            <p className="text-sm font-semibold text-[#1A1528] dark:text-[#F5F3FF]">{property.posterName}</p>
                            <div className="mt-2 space-y-1.5">
                                <p className="flex items-center gap-2 text-xs text-[#585470] dark:text-[#A79FBB]">
                                    <Mail className="h-3.5 w-3.5" /> {property.posterEmail}
                                </p>
                                <p className="flex items-center gap-2 text-xs text-[#585470] dark:text-[#A79FBB]">
                                    <Phone className="h-3.5 w-3.5" /> {property.posterPhone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showBookingModal && (
                <BookingModal
                    propertyId={property._id}
                    propertyTitle={property.title}
                    onClose={() => setShowBookingModal(false)}
                />
            )}
        </div>
    );
}