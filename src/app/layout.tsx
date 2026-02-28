import type { Metadata } from "next";
import "@/app/globals.css";
import { Layout } from "@/components/layout";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

import favicon from "@/assets/images/fruit_market_logo.png";

export const metadata: Metadata = {
  title: "The Ahmedabad Wholesale Fruit Merchants Association",
  description: "Fruit market application",
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
