"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AuthToastListener() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const flag = searchParams.get("auth");
        if (!flag) return;

        if (flag === "google") {
            toast.success("Signed in with Google successfully! Welcome to RentEasy BD🎉");
        }

        const params = new URLSearchParams(searchParams.toString());
        params.delete("auth");
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, [searchParams, pathname, router]);

    return null;
}
