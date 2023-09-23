import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    useEffect(() => {
        if (window && window.localStorage) setTheme(window.localStorage?.STRAPI_THEME)
    }, [])

    return theme
}