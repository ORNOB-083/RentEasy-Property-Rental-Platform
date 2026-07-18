"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
    isDark: boolean;
    setTheme: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const alreadyDark = document.documentElement.classList.contains("dark");
        if (alreadyDark) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDark(true);
        } else {
            const stored = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const dark = stored ? stored === "dark" : prefersDark;
            if (dark) {
                setIsDark(true);
                document.documentElement.classList.add("dark");
            }
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const setTheme = (dark: boolean) => {
        setIsDark(dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ isDark, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}