"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
    isDark: boolean;
    setTheme: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [isDark, setIsDark] = useState(false);

    // Sync React state with whatever theme the <head> script already applied
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const setTheme = (dark: boolean) => {
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
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