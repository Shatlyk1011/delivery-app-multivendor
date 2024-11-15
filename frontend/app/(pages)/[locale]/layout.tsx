import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

//widgets
import TailwindIndicator from "@/components/tailwind-indicator/tailwind-indicator";
import Footer from "@/widgets/Footer";
import Header from "@/widgets/Navigation";
import Sidebar from "@/widgets/Sidebar";

import { siteConfig } from "@/shared/site";
import { constructMetadata } from "@/shared/lib/utils";

import TanstackQueryProvider from "@/(pages)/_providers/tanstack-query";

import "@/shared/styles/globals.scss";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = constructMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  image: siteConfig.ogImage,
});

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <JotaiProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TanstackQueryProvider>
              <Header />
              <Sidebar />
              <NextTopLoader
                color="#FBDB65"
                showSpinner={false}
                speed={300}
                zIndex={3000}
                initialPosition={0.3}
                crawlSpeed={400}
                height={6}
                easing="ease"
                crawl={true}
              />
              <div className="mt-20 w-full md:mt-16">{children}</div>
              <Footer />
              <TailwindIndicator />
            </TanstackQueryProvider>
          </NextIntlClientProvider>

          <Toaster duration={3000} richColors visibleToasts={2} theme="light" position="bottom-left" />
        </JotaiProvider>
      </body>
    </html>
  );
}
