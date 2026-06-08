import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme) => {
  const root = document.documentElement;

  let resolved = theme === "system" ? getSystemTheme() : theme;

  root.classList.toggle("dark", resolved === "dark");
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("system");

  const setTheme = (newTheme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      const saved = localStorage.getItem("theme");
      if (saved === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
