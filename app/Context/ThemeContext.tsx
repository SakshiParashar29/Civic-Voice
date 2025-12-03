"use client";

import { createContext, useState, useEffect, ReactNode, useContext} from "react";

type ThemeContextType = {
    darkMode: boolean,
    toggletheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children} : {children:ReactNode}) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
       if(darkMode){
          document.documentElement.classList.add("dark");
       }else
          document.documentElement.classList.remove("dark");
    }, [darkMode]);

    const toggletheme = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{darkMode, toggletheme}}>
           {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within ThemeProvider");
  return context;
};