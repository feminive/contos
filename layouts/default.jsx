import Head from "next/head"; 
import Script from "next/script"; 
import { Navbar } from "@/components/navbar";
import { Heart } from "@/lib/icons";
import Link from "next/link";

import { SpeedInsights } from "@vercel/speed-insights/next"

export default function DefaultLayout({ children, metadata }) {
  return (
    <div className="relative flex flex-col h-screen text-md">
      <Head>
        {/* Metadados dinâmicos */}
        <link href="/eu.jpg" rel="icon" />

        <meta
          name="description"
          content={metadata?.description || "Default description"}
        />
      </Head>
      <SpeedInsights/>
      {/* Script do Microsoft Clarity */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "p5bw1mexsa");
          `,
        }}
      />

    

      <main className="container mx-auto max-w-7xl flex-grow pt-15">
        <Navbar />
        {children}
      </main>

      <footer className="w-full flex items-center justify-center py-3">
        <Link href={"/Contribua"}>
          <Heart fill={"brown"} size={20} />
        </Link>
      </footer>
    </div>
  );
}
