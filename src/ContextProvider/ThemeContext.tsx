import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType{
    isDarkMode:boolean;
    toggleDarkMode:()=>void;
}

const ThemeContext = createContext<ThemeContextType| undefined>(undefined);

export const ThemeProvider: React.FC<{children:React.ReactNode}>=({children})=>{
    const [isDarkMode,setIsDarkMode]= useState(()=>{
        return localStorage.getItem("theme") === "dark";
    })

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return newTheme; // ✅ Ensure the function returns the new state
        });
    };
    

    useEffect(()=>{
        if(isDarkMode){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    },[isDarkMode]);

    return (
        <ThemeContext.Provider value={{isDarkMode,toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
  };