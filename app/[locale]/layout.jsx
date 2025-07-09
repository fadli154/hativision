import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/i18n";
import "@/app/[locale]/globals.css";
import ClientLayout from "./client-layout"; // ← komponen client

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  return {
    title: "hatiVision - Landing Page",
    icons: {
      icon: "/favicon.ico", // ← tambahkan baris ini
    },
  };
}

export default async function LocaleLayout(props) {
  const { children } = props;
  const params = await props.params;

  const locale = params.locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} style={{ colorScheme: "normal" }} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
