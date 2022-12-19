import React, { createContext, useEffect, useState } from "react";
import { defaultColors, darkColors, draculaMintColors } from "./colors";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext({
    dark: false,
    colors: defaultColors,

    // setScheme: () => {}
});

export const ThemeProvider = (props: any) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark')

    useEffect(() => {
        setIsDark(colorScheme === 'dark')
    }, [colorScheme]);

    const theme = {
        dark: isDark,
        colors: isDark ? darkColors : defaultColors,
        
        // setScheme: (scheme: string) => setIsDark(scheme === 'dark')
    }

    return(
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
}