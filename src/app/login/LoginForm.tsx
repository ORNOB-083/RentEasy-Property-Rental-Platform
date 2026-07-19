"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import loaderCat from "@/../public/Loader-cat.json";

export default function LoginForm({ redirectTo = "/" }: { redirectTo?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw new Error(error.message);
            }

            toast.success("Welcome back!");
            router.push(redirectTo);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Invalid email or password. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const toastId = toast.loading("Redirecting to Google...");
        try {
            const separator = redirectTo.includes("?") ? "&" : "?";
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: `${redirectTo}${separator}auth=google`,
            });

            if (error) {
                throw new Error(error.message);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Google authentication failed. Please try again.";
            toast.error(message, { id: toastId });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9FC] dark:bg-[#0D0716] transition-colors duration-300">
            <div className="max-w-6xl w-full bg-white dark:bg-[#1A1125] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#E5E7EB] dark:border-[#2D2140]">

                <div className="w-full md:w-1/2 bg-[#9B4DCA]/5 dark:bg-[#8B5CF6]/10 p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9B4DCA] to-[#7C3AED] opacity-10 dark:opacity-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 mb-6 drop-shadow-xl">
                            <Lottie
                                animationData={loaderCat}
                                loop={true}
                                autoplay={true}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h2 className="text-3xl font-bold text-[#1A1528] dark:text-[#F5F3FF] mb-2">
                            Welcome Back to <span className="text-[#9B4DCA] dark:text-[#8B5CF6]">RentEasy BD</span>
                        </h2>
                        <p className="text-[#585470] dark:text-[#A79FBB] text-lg max-w-sm">
                            Log in to manage your listings, saved properties, and booking requests.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-[#1A1528] dark:text-[#F5F3FF] mb-1">
                            Log In
                        </h2>
                        <p className="text-[#585470] dark:text-[#A79FBB] mb-6 text-sm">
                            Don&apos;t have an account?
                            <Link href="/register" className="text-[#9B4DCA] dark:text-[#8B5CF6] font-medium hover:underline ml-1">
                                Sign up
                            </Link>
                        </p>

                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-transparent py-3 px-4 text-[15px] font-medium text-[#1A1528] dark:text-[#F5F3FF] transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#0D0716] hover:border-[#9B4DCA] dark:hover:border-[#8B5CF6] active:scale-95"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-[#E5E7EB] dark:border-[#2D2140]" />
                            <span className="px-4 text-[#585470] dark:text-[#A79FBB] text-xs">or</span>
                            <div className="flex-1 border-t border-[#E5E7EB] dark:border-[#2D2140]" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB] mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-transparent px-4 py-3 text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-[#585470] dark:text-[#A79FBB]">
                                        Password
                                    </label>
                                    {/* <Link
                                        href="/forgot-password"
                                        className="text-xs font-medium text-[#9B4DCA] dark:text-[#8B5CF6] hover:underline"
                                    >
                                        Forgot password?
                                    </Link> */}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full rounded-xl border-2 border-[#E5E7EB] dark:border-[#2D2140] bg-transparent px-4 py-3 pr-12 text-[#1A1528] dark:text-[#F5F3FF] focus:border-[#9B4DCA] dark:focus:border-[#8B5CF6] focus:outline-none transition-all duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#585470] dark:text-[#A79FBB] hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-[#9B4DCA] py-3.5 text-[16px] font-medium text-[#FFFFFF] shadow-md transition-all duration-200 hover:bg-[#8A3EBA] hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] mt-2"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}