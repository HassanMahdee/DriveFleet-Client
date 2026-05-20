"use client";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useEffect } from "react";
export function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme(
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme")
      : "light",
  );
  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="btn btn-ghost btn-circle"
    >
      {theme === "light" ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
    </button>
  );
}
