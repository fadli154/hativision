// app/[locale]/client-layout.tsx
"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/context/LoadingContext";

export default function ClientLayout({ children, locale, messages }) {
  return (
    <LoadingProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </LoadingProvider>
  );
}
