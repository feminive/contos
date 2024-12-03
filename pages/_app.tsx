import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
import { DataUserProvider } from "@/context/userData";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { DataProvider } from "../context/DataContext";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import "@smastrom/react-rating/style.css";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <div>
      {/* <SessionProvider session={session}> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8CFS16SYJ0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8CFS16SYJ0');
        `}
      </Script>
      <NextUIProvider navigate={router.push}>
        {/* <DataUserProvider> */}
        <NextThemesProvider>
          {/* <DataProvider> */}
          <Component {...pageProps} />
          {/* </DataProvider> */}
        </NextThemesProvider>
        {/* </DataUserProvider> */}
      </NextUIProvider>

      {/* </SessionProvider> */}
    </div>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
