"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Menu, X } from "lucide-react";
import React, { useMemo } from "react";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const tMenu = useTranslations("MenuItem");

  const menuItems = useMemo(
    () => [
      { name: tMenu("home"), href: "#home" },
      { name: tMenu("start"), href: "#voiceai" },
      { name: tMenu("features"), href: "#features" },
      { name: tMenu("team"), href: "#team" },
    ],
    [tMenu]
  );

  useEffect(() => {
    const sections = menuItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 20) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState && "active"} className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button onClick={() => setMenuState(!menuState)} aria-label={menuState == true ? "Close Menu" : "Open Menu"} className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className={`block duration-150 ${activeSection === item.href.replace("#", "") ? "text-primary font-semibold" : "text-muted-foreground hover:text-accent-foreground"}`}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <AnimatePresence>
              {menuState && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-background mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:hidden"
                >
                  <div className="lg:hidden">
                    <ul className="space-y-6 text-base">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <a href={item.href} onClick={() => setMenuState(false)} className="block text-muted-foreground hover:text-accent-foreground duration-150">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex justify-center space-x-3">
                      <ModeToggle />
                      <LocaleSwitcher />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tampilkan toggle di desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <ModeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
