import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Properties", href: "/properties" },
    { label: "Add Property", href: "/properties/add" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Help / FAQ", href: "/help" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] dark:bg-[#0D0716] dark:border-[#2D2140] transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="flex flex-col gap-4 lg:border-r lg:border-[#E5E7EB] dark:lg:border-[#2D2140] lg:pr-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/icon.png"
                                alt="RentEasyBD logo"
                                width={28}
                                height={28}
                                className="h-7 w-7 object-contain"
                            />
                            <span className="text-xl font-bold text-[#1A1528] dark:text-[#F5F3FF]">
                                RentEasy
                                <span className="ml-2 text-[#9B4DCA] dark:text-[#8B5CF6]">
                                    BD
                                </span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-[#585470] dark:text-[#A79FBB] max-w-xs">
                            Find or list rental properties across Dhaka — apartments, studios, family flats, and more, all in one place.
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#2D2140] text-[#585470] dark:text-[#A79FBB] transition-all duration-200 hover:bg-[#9B4DCA] hover:text-white hover:border-[#9B4DCA] hover:shadow-md active:scale-95 dark:hover:bg-[#8B5CF6] dark:hover:text-white dark:hover:border-[#8B5CF6]"
                            >
                                <FaFacebookF className="h-4 w-4" />
                            </a>
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#2D2140] text-[#585470] dark:text-[#A79FBB] transition-all duration-200 hover:bg-[#9B4DCA] hover:text-white hover:border-[#9B4DCA] hover:shadow-md active:scale-95 dark:hover:bg-[#8B5CF6] dark:hover:text-white dark:hover:border-[#8B5CF6]"
                            >
                                <FaXTwitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#2D2140] text-[#585470] dark:text-[#A79FBB] transition-all duration-200 hover:bg-[#9B4DCA] hover:text-white hover:border-[#9B4DCA] hover:shadow-md active:scale-95 dark:hover:bg-[#8B5CF6] dark:hover:text-white dark:hover:border-[#8B5CF6]"
                            >
                                <FaInstagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:border-r lg:border-[#E5E7EB] dark:lg:border-[#2D2140] lg:pr-8">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1A1528] dark:text-[#F5F3FF]">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-[#585470] dark:text-[#A79FBB] hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] hover:translate-x-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 lg:border-r lg:border-[#E5E7EB] dark:lg:border-[#2D2140] lg:pr-8">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1A1528] dark:text-[#F5F3FF]">
                            Contact Info
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            <li className="flex items-start gap-2 text-sm text-[#585470] dark:text-[#A79FBB]">
                                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                                <a href="mailto:support@renteasybd.com" className="hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] transition-colors">
                                    support@renteasybd.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-[#585470] dark:text-[#A79FBB]">
                                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                                <a href="tel:+8801700000000" className="hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] transition-colors">
                                    +880 1700-000000
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-[#585470] dark:text-[#A79FBB]">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#9B4DCA] dark:text-[#8B5CF6]" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 lg:pl-8">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1A1528] dark:text-[#F5F3FF]">
                            Support
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-[#585470] dark:text-[#A79FBB] hover:text-[#9B4DCA] dark:hover:text-[#8B5CF6] hover:translate-x-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 bg-[#F9FAFB] dark:bg-[#110B1C] border-t border-[#E5E7EB] dark:border-[#2D2140] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[#585470] dark:text-[#A79FBB]">
                        © {new Date().getFullYear()} RentEasy BD. All rights reserved.
                    </p>
                    <p className="text-xs text-[#585470] dark:text-[#A79FBB]">
                        Built for students, families, and everyone in between.
                    </p>
                </div>
            </div>
        </footer>
    );
}