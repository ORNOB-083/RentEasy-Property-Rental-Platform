"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

/**
 * Shows a toast after returning from a full-page OAuth redirect (e.g. Google).
 * The login/register forms append ?auth=google to the callback URL; this
 * component detects it, toasts once, and cleans the flag from the URL.
 */
export default function AuthToastListener() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const flag = searchParams.get("auth");
        if (!flag) return;

        if (flag === "google") {
            toast.success("Signed in with Google successfully! Welcome to RentEasy BD.");
        }

        // Remove the flag from the URL so refreshes don't re-toast
        const params = new URLSearchParams(searchParams.toString());
        params.delete("auth");
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, [searchParams, pathname, router]);

    return null;
}
