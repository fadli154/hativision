"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useGlobalLoading } from "@/context/LoadingContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const locales = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const { setIsLoading } = useGlobalLoading();

  const getNewPath = (locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || "/";
  };

  const handleLocaleChange = (code) => {
    if (code === currentLocale) return;
    setIsLoading(true);
    router.push(getNewPath(code));
  };

  const current = locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-2 py-[16.8px]">
          <Globe className="size-4" />
          <span className="flex items-center gap-1 text-sm">
            <span className="text-base leading-none">{current.flag}</span>
            {current.label}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[9999]">
        {locales.map(({ code, label, flag }) => (
          <DropdownMenuItem key={code} onSelect={() => handleLocaleChange(code)} className="cursor-pointer">
            <span className="flex items-center gap-2 text-sm">
              <span className="text-base leading-none">{flag}</span>
              {label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
