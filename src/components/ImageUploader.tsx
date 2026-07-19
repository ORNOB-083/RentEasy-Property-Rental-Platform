"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 5 }: ImageUploaderProps) {
    const [mode, setMode] = useState<"device" | "url">("device");
    const [urlInput, setUrlInput] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const remainingSlots = maxImages - images.length;
        if (remainingSlots <= 0) {
            toast.error(`Maximum ${maxImages} images allowed.`);
            return;
        }

        const filesToUpload = Array.from(files).slice(0, remainingSlots);
        setUploading(true);

        try {
            const uploadedUrls: string[] = [];

            for (const file of filesToUpload) {
                const formData = new FormData();
                formData.append("image", file);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
                    { method: "POST", body: formData }
                );

                const data = await res.json();
                if (data?.data?.url) {
                    uploadedUrls.push(data.data.url);
                }
            }

            if (uploadedUrls.length > 0) {
                onChange([...images, ...uploadedUrls]);
                toast.success(`${uploadedUrls.length} image(s) uploaded.`);
            } else {
                toast.error("No images could be uploaded. Please try again.");
            }
        } catch {
            toast.error("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
            e.target.value = ""; // reset input so the same file can be re-selected later
        }
    };

    const handleAddUrl = () => {
        const trimmed = urlInput.trim();
        if (!trimmed) return;

        if (images.length >= maxImages) {
            toast.error(`Maximum ${maxImages} images allowed.`);
            return;
        }

        try {
            new URL(trimmed); // throws if invalid
        } catch {
            toast.error("Please enter a valid image URL.");
            return;
        }

        if (images.includes(trimmed)) {
            toast.error("This image URL has already been added.");
            return;
        }

        onChange([...images, trimmed]);
        setUrlInput("");
    };

    const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddUrl();
        }
    };

    const handleRemove = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                Property Images ({images.length}/{maxImages})
            </label>
            <p className="text-xs text-[#585470] dark:text-[#A79FBB] mb-3">
                Upload 1–{maxImages} images from your device, or paste image URLs.
            </p>

            <div className="flex gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => setMode("device")}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${mode === "device"
                            ? "bg-[#9B4DCA] text-white dark:bg-[#8B5CF6]"
                            : "border border-[#E5E7EB] dark:border-[#2D2140] text-[#585470] dark:text-[#A79FBB] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6]"
                        }`}
                >
                    <Upload className="h-3.5 w-3.5" />
                    Upload from device
                </button>
                <button
                    type="button"
                    onClick={() => setMode("url")}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${mode === "url"
                            ? "bg-[#9B4DCA] text-white dark:bg-[#8B5CF6]"
                            : "border border-[#E5E7EB] dark:border-[#2D2140] text-[#585470] dark:text-[#A79FBB] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6]"
                        }`}
                >
                    <LinkIcon className="h-3.5 w-3.5" />
                    Paste image URL
                </button>
            </div>

            {/* Device upload */}
            {mode === "device" && (
                <label
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] dark:border-[#2D2140] py-8 cursor-pointer hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] transition-colors ${images.length >= maxImages || uploading ? "opacity-50 pointer-events-none" : ""
                        }`}
                >
                    {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-[#9B4DCA] dark:text-[#8B5CF6]" />
                    ) : (
                        <Upload className="h-6 w-6 text-[#585470] dark:text-[#A79FBB]" />
                    )}
                    <span className="text-sm text-[#585470] dark:text-[#A79FBB]">
                        {uploading ? "Uploading..." : "Click to select image(s)"}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleDeviceUpload}
                        disabled={images.length >= maxImages || uploading}
                        className="hidden"
                    />
                </label>
            )}

            {/* URL input */}
            {mode === "url" && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={handleUrlKeyDown}
                        placeholder="https://example.com/image.jpg"
                        disabled={images.length >= maxImages}
                        className="flex-1 rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-transparent px-4 py-2.5 text-sm text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none transition-all duration-200 disabled:opacity-50"
                    />
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        disabled={images.length >= maxImages || !urlInput.trim()}
                        className="rounded-xl bg-[#9B4DCA] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#8A3EBA] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] disabled:opacity-50 transition-colors"
                    >
                        Add
                    </button>
                </div>
            )}

            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {images.map((url, index) => (
                        <div
                            key={`${url}-${index}`}
                            className="relative aspect-square rounded-lg overflow-hidden border border-[#E5E7EB] dark:border-[#2D2140] bg-[#F3EFF9] dark:bg-[#150C22]"
                        >
                            <Image
                                src={url}
                                alt={`Property image ${index + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                aria-label="Remove image"
                                className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                                <span className="absolute bottom-1 left-1 rounded-full bg-[#9B4DCA] dark:bg-[#8B5CF6] px-2 py-0.5 text-[10px] font-medium text-white">
                                    Cover
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}