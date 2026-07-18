import axios from "axios";
import { authClient } from "@/lib/auth-client";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach the Better Auth JWT to every outgoing request automatically
api.interceptors.request.use(async (config) => {
    try {
        const { data } = await authClient.token();
        if (data?.token) {
            config.headers.Authorization = `Bearer ${data.token}`;
        }
    } catch {
        // Not logged in — send the request without a token;
        // protected endpoints will respond 401 and the caller can handle it.
    }
    return config;
});

export default api;
