import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
    title: "Login | RentEasy BD",
    description: "Log in to your RentEasy BD account to manage your listings and bookings.",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/";
    return <LoginForm redirectTo={redirectTo} />;
}