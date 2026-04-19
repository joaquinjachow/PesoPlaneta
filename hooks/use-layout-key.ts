"use client";
import { useState, useEffect } from "react";

export function useLayoutKey(): string {
  const [key, setKey] = useState("1-portrait");

  useEffect(() => {
    function getColumns(): number {
      if (typeof window === "undefined") return 1;
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }
    function getOrientation(): string {
      if (typeof window === "undefined") return "portrait";
      const orient = window.matchMedia("(orientation: portrait)");
      return orient.matches ? "portrait" : "landscape";
    }
    function updateKey() {
      setKey((prev) => {
        const next = `${getColumns()}-${getOrientation()}`;
        return next === prev ? prev : next;
      });
    }
    updateKey();
    window.addEventListener("resize", updateKey);
    const mq = window.matchMedia("(orientation: portrait)");
    mq.addEventListener("change", updateKey);
    return () => {
      window.removeEventListener("resize", updateKey);
      mq.removeEventListener("change", updateKey);
    };
  }, []);
  return key;
}