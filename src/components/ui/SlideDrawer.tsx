"use client";

import React, { useEffect } from "react";
import { useLenis } from "@/context/LenisContext";

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  maxWidthClass?: string;
  children: React.ReactNode;
}

export default function SlideDrawer({
  isOpen,
  onClose,
  side = "left",
  maxWidthClass = "max-w-sm",
  children,
}: SlideDrawerProps) {
  const { stop, start } = useLenis();

  useEffect(() => {
    if (!isOpen) {
      start();
      return;
    }
    stop();
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      start();
    };
  }, [isOpen, onClose, stop, start]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex ${
        side === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <aside
        data-lenis-prevent
        className={`relative z-50 mt-[72px] flex h-[calc(100dvh-72px)] w-full ${maxWidthClass} flex-col justify-between bg-white p-6 sm:p-8 text-[#171717] shadow-2xl`}
      >
        {children}
      </aside>
    </div>
  );
}
