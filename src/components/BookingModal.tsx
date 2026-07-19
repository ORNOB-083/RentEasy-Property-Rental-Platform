"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";

interface BookingModalProps {
    propertyId: string;
    propertyTitle: string;
    onClose: () => void;
}

export default function BookingModal({ propertyId, propertyTitle, onClose }: BookingModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        whatsapp: "",
        facebook: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phone.trim()) {
            toast.error("Phone number is required.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/bookings", {
                propertyId,
                phone: formData.phone,
                whatsapp: formData.whatsapp || undefined,
                facebook: formData.facebook || undefined,
                message: formData.message || undefined,
            });

            toast.success("Booking request sent! The owner will be notified.");
            onClose();
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const message = (err as any)?.response?.data?.message || "Failed to send booking request.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#1A1125] border border-[#E5E7EB] dark:border-[#2D2140] shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB] dark:border-[#2D2140]">
                    <div>
                        <h3 className="text-lg font-semibold text-[#1A1528] dark:text-[#F5F3FF]">
                            Request to Book
                        </h3>
                        <p className="text-xs text-[#585470] dark:text-[#A79FBB] line-clamp-1">
                            {propertyTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-full p-2 text-[#585470] dark:text-[#A79FBB] hover:bg-[#9B4DCA]/10 dark:hover:bg-[#8B5CF6]/10 hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-[#F3EFF9] dark:bg-[#150C22] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:bg-white dark:focus:bg-[#1A1125] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                            WhatsApp Number <span className="text-xs font-normal">(optional)</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-[#F3EFF9] dark:bg-[#150C22] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:bg-white dark:focus:bg-[#1A1125] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                            Facebook Profile <span className="text-xs font-normal">(optional)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.facebook}
                            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                            placeholder="facebook.com/yourprofile"
                            className="w-full rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-[#F3EFF9] dark:bg-[#150C22] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:bg-white dark:focus:bg-[#1A1125] focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                            Message <span className="text-xs font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Any details you'd like to share with the owner..."
                            rows={3}
                            className="w-full resize-none rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-[#F3EFF9] dark:bg-[#150C22] px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:bg-white dark:focus:bg-[#1A1125] focus:outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[#9B4DCA] dark:bg-[#8B5CF6] py-3 text-sm font-medium text-white transition-all hover:bg-[#8A3EBA] dark:hover:bg-[#7C3AED] active:scale-95 disabled:opacity-60"
                    >
                        {loading ? "Sending Request..." : "Confirm Booking Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}