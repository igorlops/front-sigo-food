'use client';

import { useEffect } from 'react';

interface ThemeWrapperProps {
    primaryColor?: string;
    secondaryColor?: string;
    children: React.ReactNode;
}

export default function ThemeWrapper({ primaryColor, secondaryColor, children }: ThemeWrapperProps) {
    useEffect(() => {
        const root = document.documentElement;
        if (primaryColor) {
            root.style.setProperty('--color-primary', primaryColor);
        }
        if (secondaryColor) {
            root.style.setProperty('--color-secondary', secondaryColor);
        }
    }, [primaryColor, secondaryColor]);

    return <>{children}</>;
}
