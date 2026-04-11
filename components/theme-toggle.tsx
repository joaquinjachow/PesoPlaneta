"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 bg-card border-border dark:border-white pointer-events-none opacity-80"
        disabled
        aria-disabled="true"
        aria-label="Cargando tema"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="h-10 w-10 bg-card border-border hover:bg-muted dark:border-white"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}