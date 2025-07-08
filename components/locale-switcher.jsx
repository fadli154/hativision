"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useGlobalLoading } from "@/context/LoadingContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Icon } from "@iconify/react";

// Ganti flag emoji ke nama iconify
const locales = [
  { code: "id", label: "Indonesia", icon: "emojione:flag-for-indonesia" },
  { code: "en", label: "English", icon: "emojione:flag-for-united-states" },
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
    <DropdownMenu className="z-99999">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-2 py-[16.8px]">
          <Globe className="size-4" />
          <span className="flex items-center gap-1 text-sm">
            <Icon icon={current.icon} width={18} height={18} />
            {current.label}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-99999">
        {locales.map(({ code, label, icon }) => (
          <DropdownMenuItem key={code} onSelect={() => handleLocaleChange(code)} className="cursor-pointer">
            <span className="flex items-center gap-2 text-sm">
              <Icon icon={icon} width={18} height={18} />
              {label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
