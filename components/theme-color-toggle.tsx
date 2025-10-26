'use client'
import { useState, useEffect, useMemo } from "react";

export default function ThemeColorToggle() {
  // Define available themes

  const themes = useMemo(() => ({
    green: "theme-green",
    blue: "theme-blue",
    blackWhite: "theme-bw"
  }), []);
  // Initialize state with the current theme (defaulting to green)
  const [currentTheme, setCurrentTheme] = useState(themes.blue);

  // Set up initial theme on component mount
  useEffect(() => {
    // Check if theme exists in localStorage
    const savedTheme = localStorage.getItem("color-theme");
    if (savedTheme && Object.values(themes).includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.classList.remove(...Object.values(themes));
      document.documentElement.classList.add(savedTheme);
    } else {
      setCurrentTheme(themes.blue);
      document.documentElement.classList.remove(...Object.values(themes));
      document.documentElement.classList.add(themes.blue);
    }
  }, [themes]);

  // Handle theme changes
  const changeTheme = (theme: string) => {
    // Remove all theme classes
    document.documentElement.classList.remove(...Object.values(themes));
    // Add the selected theme class
    document.documentElement.classList.add(theme);
    // Update state
    setCurrentTheme(theme);
    // Save to localStorage
    localStorage.setItem("color-theme", theme);
  };

  return (
    <div className="fixed top-40 left-0 z-50 flex flex-col gap-2">
      {/* Green theme */}
      <div 
        className={`group cursor-pointer rounded-l-none rounded-r-sm p-0.5 md:p-1 transition-all ${
          currentTheme === themes.green 
            ? "outline-2 outline-offset-2 outline-primary" 
            : "hover:opacity-80"
        }`}
        onClick={() => changeTheme(themes.green)}
        aria-label="Switch to green theme"
      >
        <div className="w-7 md:w-8 aspect-square bg-[var(--theme-green-primary)] dark:bg-[var(--theme-green-primary-dark)] rounded-sm" 
          style={{
            "--theme-green-primary": "oklch(0.723 0.219 149.579)",
            "--theme-green-primary-dark": "oklch(0.696 0.17 162.48)"
          } as React.CSSProperties}
        />
      </div>

      {/* Blue theme */}
      <div 
        className={`group cursor-pointer rounded-l-none rounded-r-sm p-0.5 md:p-1 transition-all ${
          currentTheme === themes.blue 
            ? "outline-2 outline-offset-2 outline-primary" 
            : "hover:opacity-80"
        }`}
        onClick={() => changeTheme(themes.blue)}
        aria-label="Switch to Blue theme"
      >
        <div className="w-7 md:w-8 aspect-square bg-[var(--theme-blue-primary)] dark:bg-[var(--theme-blue-primary-dark)] rounded-sm" 
          style={{
            "--theme-blue-primary": "oklch(0.623 0.214 259.815)",
            "--theme-blue-primary-dark": "oklch(68.525% 0.13784 258.625)"
          } as React.CSSProperties}
        />
      </div>

      {/* Black and White theme */}
      <div 
        className={`group cursor-pointer rounded-l-none rounded-r-sm  p-0.5 md:p-1 transition-all ${
          currentTheme === themes.blackWhite 
            ? " outline-2 outline-offset-2 outline-primary" 
            : "hover:opacity-80"
        }`}
        onClick={() => changeTheme(themes.blackWhite)}
        aria-label="Switch to black and white theme"
      >
        <div className="w-7 md:w-8 aspect-square bg-[var(--theme-bw-primary)] dark:bg-[var(--theme-bw-primary-dark)] rounded-sm" 
          style={{
            "--theme-bw-primary": "oklch(0.21 0.006 285.885)",
            "--theme-bw-primary-dark": "oklch(0.92 0.004 286.32)"
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}