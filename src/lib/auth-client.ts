import { createAuthClient } from "better-auth/react";
import { adminClient, jwtClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [
        adminClient(),
        jwtClient(),
        inferAdditionalFields<typeof auth>()
    ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

