"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Bell, Sun, Moon, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Properties", href: "/properties" },
    { label: "Add Property", href: "/properties/add" },
    { label: "Saved", href: "/saved" },
];

export default function Navbar() {
    const { isDark, setTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = useSession();
    const isLoggedIn = !!session?.user;
    const user = session?.user;

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname === `${href}/`;
    };

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            toast.success("Logged out successfully.");
            setProfileOpen(false);
            router.push("/");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to log out. Please try again.";
            toast.error(message);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.06)] border-b border-[#E5E7EB] dark:bg-[#0D0716] dark:border-[#2D2140] transition-colors duration-300">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/icon.png"
                        alt="RentEasyBD logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                        priority
                    />
                    <span className="text-3xl font-bold text-[#1A1528] dark:text-[#F5F3FF] transition-colors">
                        RentEasy
                        <span className="text-[#9B4DCA] dark:text-[#8B5CF6]">
                            BD
                        </span>
                    </span>
                </Link>

                <div className="hidden items-center gap-1 mx-6 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200 active:scale-95 ${active
                                    ? "bg-[#9B4DCA] text-[#FFFFFF] shadow-sm ring-1 ring-[#9B4DCA]/20 dark:bg-[#8B5CF6]"
                                    : "text-[#1A1528] hover:bg-[#9B4DCA]/10 hover:text-[#9B4DCA] dark:text-[#F5F3FF] dark:hover:bg-[#8B5CF6]/20 dark:hover:text-[#8B5CF6]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        onClick={() => setTheme(!isDark)}
                        className="relative rounded-full p-2.5 border border-[#E5E7EB] dark:border-[#2D2140] bg-[#FFFFFF] dark:bg-[#1A1125] text-[#1A1528] dark:text-[#F5F3FF] shadow-sm transition-all duration-300 hover:border-[#9B4DCA] hover:bg-[#9B4DCA]/5 hover:shadow-md active:scale-95 dark:hover:border-[#8B5CF6] dark:hover:bg-[#8B5CF6]/10"
                        aria-label="Toggle theme"
                    >
                        <div className="relative h-5 w-5 flex items-center justify-center overflow-hidden">
                            <Sun
                                className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${isDark
                                    ? "translate-y-10 opacity-0 rotate-90"
                                    : "translate-y-0 opacity-100 rotate-0"
                                    }`}
                            />
                            <Moon
                                className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${isDark
                                    ? "translate-y-0 opacity-100 rotate-0"
                                    : "-translate-y-10 opacity-0 -rotate-90"
                                    }`}
                            />
                        </div>
                    </button>

                    {!isPending && isLoggedIn ? (
                        <>
                            <button
                                aria-label="Notifications"
                                className="relative rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-2.5 text-[#1A1528] transition-all duration-200 hover:border-[#9B4DCA] hover:bg-[#9B4DCA]/5 hover:text-[#9B4DCA] active:scale-95 dark:text-[#F5F3FF] dark:hover:text-[#8B5CF6]"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#108981] dark:bg-[#2DD4BF]" />
                            </button>

                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setProfileOpen((prev) => !prev)}
                                    className="flex items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#2D2140] pl-1.5 pr-3 py-1.5 transition-all duration-200 hover:border-[#9B4DCA] hover:bg-[#9B4DCA]/5 active:scale-95"
                                >
                                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#9B4DCA]/10 dark:bg-[#8B5CF6]/20">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name || "User avatar"}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#9B4DCA] dark:text-[#8B5CF6]">
                                                {user?.name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-[#1A1528] dark:text-[#F5F3FF] max-w-[100px] truncate">
                                        {user?.name || "Account"}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-[#585470] dark:text-[#A79FBB] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-[#2D2140] bg-white dark:bg-[#1A1125] shadow-xl">
                                        <div className="border-b border-[#E5E7EB] dark:border-[#2D2140] px-4 py-3">
                                            <p className="truncate text-sm font-semibold text-[#1A1528] dark:text-[#F5F3FF]">
                                                {user?.name}
                                            </p>
                                            <p className="truncate text-xs text-[#585470] dark:text-[#A79FBB]">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setProfileOpen(false)}
                                            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#1A1528] dark:text-[#F5F3FF] hover:bg-[#9B4DCA]/5 dark:hover:bg-[#8B5CF6]/10 transition-colors"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/5 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        !isPending && (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-full border-2 border-[#9B4DCA] px-5 py-2.5 text-[15px] font-medium text-[#9B4DCA] transition-all duration-200 hover:bg-[#9B4DCA] hover:text-[#FFFFFF] active:scale-95 dark:border-[#8B5CF6] dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-[#FFFFFF]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-[#9B4DCA] px-5 py-2.5 text-[15px] font-medium text-[#FFFFFF] shadow-md transition-all duration-200 hover:bg-[#8A3EBA] hover:shadow-lg active:scale-95 dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
                                >
                                    Register
                                </Link>
                            </>
                        )
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={() => setTheme(!isDark)}
                        className="relative rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-2 bg-[#FFFFFF] dark:bg-[#1A1125] text-[#1A1528] dark:text-[#F5F3FF] transition-colors hover:bg-[#9B4DCA]/5 dark:hover:bg-[#8B5CF6]/10"
                    >
                        <div className="relative h-4 w-4 flex items-center justify-center overflow-hidden">
                            <Sun className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? "translate-y-8 opacity-0 rotate-90" : "translate-y-0 opacity-100 rotate-0"}`} />
                            <Moon className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 -rotate-90"}`} />
                        </div>
                    </button>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        className="rounded-full border border-[#E5E7EB] dark:border-[#2D2140] p-2 text-[#1A1528] transition-colors hover:bg-[#9B4DCA]/5 dark:text-[#F5F3FF] dark:hover:bg-[#8B5CF6]/10"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="border-t border-[#E5E7EB] bg-[#FFFFFF] px-4 py-4 shadow-inner dark:border-[#2D2140] dark:bg-[#0D0716] md:hidden">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className={`rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 active:scale-95 ${active
                                        ? "bg-[#9B4DCA] text-[#FFFFFF] shadow-sm dark:bg-[#8B5CF6]"
                                        : "text-[#1A1528] hover:bg-[#9B4DCA]/10 hover:text-[#9B4DCA] dark:text-[#F5F3FF] dark:hover:bg-[#8B5CF6]/20 dark:hover:text-[#8B5CF6]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {!isPending && isLoggedIn ? (
                            <div className="mt-4 flex flex-col gap-3 border-t border-[#E5E7EB] pt-4 dark:border-[#2D2140]">
                                <div className="flex items-center gap-3 px-2 pb-2">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#9B4DCA]/10 dark:bg-[#8B5CF6]/20">
                                        {user?.image ? (
                                            <Image src={user.image} alt={user.name || "User avatar"} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#9B4DCA] dark:text-[#8B5CF6]">
                                                {user?.name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-[#1A1528] dark:text-[#F5F3FF]">
                                            {user?.name}
                                        </p>
                                        <p className="truncate text-xs text-[#585470] dark:text-[#A79FBB]">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] py-2.5 text-center text-[15px] font-medium text-[#1A1528] transition-colors hover:bg-[#9B4DCA]/5 dark:border-[#2D2140] dark:text-[#F5F3FF] dark:hover:bg-[#8B5CF6]/10"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center justify-center gap-2 rounded-full border border-red-500/30 py-2.5 text-center text-[15px] font-medium text-red-500 transition-colors hover:bg-red-500/5"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            !isPending && (
                                <div className="mt-4 flex flex-col sm:flex-row gap-3 border-t border-[#E5E7EB] pt-4 dark:border-[#2D2140]">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 rounded-full border-2 border-[#9B4DCA] py-2.5 text-center text-[15px] font-medium text-[#9B4DCA] transition-colors hover:bg-[#9B4DCA] hover:text-[#FFFFFF] dark:border-[#8B5CF6] dark:text-[#8B5CF6] dark:hover:bg-[#8B5CF6] dark:hover:text-[#FFFFFF]"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 rounded-full bg-[#9B4DCA] py-2.5 text-center text-[15px] font-medium text-[#FFFFFF] shadow-sm transition-colors hover:bg-[#8A3EBA] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}