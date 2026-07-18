import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
    title: "Register | RentEasy BD",
    description: "Create a RentEasy BD account to find your dream home or list your property across Dhaka.",
};

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/";
    return <RegisterForm redirectTo={redirectTo} />;
}
