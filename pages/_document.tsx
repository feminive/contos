import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html
      lang="pt-BR"
      className=" bg-gradient-to-r from-[#fdedec] via-* to-[#f4f4f4]"
    >
      <Head />
      <body className="min-h-screen font-sans antialiased  ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
