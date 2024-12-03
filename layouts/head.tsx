import React from "react";
import NextHead from "next/head";

const defaultOpenGraphImage = {
  url: `${process.env.NEXT_PRIVATE_URL}/redes.png`,
  width: 800,
  height: 600,
  alt: "Feminive Fanfics Default Image",
};

interface Metadata {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  openGraph?: {
    url?: string;
    siteName?: string;
    image?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    };
    locale?: string;
    type?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      noimageindex?: boolean;
      maxVideoPreview?: number;
      maxImagePreview?: string;
      maxSnippet?: number;
    };
  };
  icons?: {
    icon?: string;
    shortcut?: string;
    apple?: string;
    other?: {
      rel?: string;
      url?: string;
    };
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    creator?: string;
    image?: string; // Change to string type for image URL
  };
  verification?: {
    google?: string;
    yandex?: string;
    yahoo?: string;
    other?: {
      me?: string[];
    };
    bookmarks?: string[];
  };
}

interface HeadProps {
  metadata?: Metadata;
}

export const Head: React.FC<HeadProps> = ({ metadata }) => {
  const {
    title = "Feminive Fanfics Contos Eróticos Femininos",
    description = "Um blog de contos eróticos femininos feito para mulheres.",
    keywords = "contos eróticos, blog, fanfics femininas, histórias sensuais, contos para mulheres",
    canonical = "https://feminivefanfics.com.br",
    openGraph = {},
    robots = {},
    icons = {},
    twitter = {},
    verification = {},
  } = metadata || {};

  const {
    url = "https://feminivefanfics.com.br",
    siteName = "Feminive Fanfics",
    image = defaultOpenGraphImage, // Use `image` in place of `images`
    locale = "pt_BR",
    type = "website",
  } = openGraph;

  const {
    index = false,
    follow = true,
    nocache = true,
    googleBot = {
      index: true,
      follow: false,
      noimageindex: true,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  } = robots;

  const {
    icon = "/feminive.ico",
    shortcut = "/feminive.ico",
    apple = "/feminive.ico",
    other = {
      rel: "apple-touch-icon-precomposed",
      url: "/feminive.png",
    },
  } = icons;

  const {
    card = "summary_large_image",
    title: twitterTitle = "Feminive Fanfics",
    description:
      twitterDescription = "Um site de Contos Eróticos feito para garotas!",
    creator = "@feminivefanfics",
    image: twitterImage = "https://feminivefanfics.com.br/twitter.png", // This should be dynamic based on metadata
  } = twitter;

  const {
    google: googleVerification = "google",
    yandex: yandexVerification = "yandex",
    yahoo: yahooVerification = "yahoo",
    other: {
      me: verificationMe = [
        "feminive@feminivefanfics.com.br",
        "feminivefanfics.com.br",
      ],
    } = {},
    bookmarks: verificationBookmarks = ["https://feminivefanfics.com.br"],
  } = verification;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    alternativeHeadline: "Feminive Fanfics - Contos Eróticos",
    image: "https://feminivefanfics.com.bg/redes.png",
    award: "Melhor conto erótico do",
    editor: "Feminive Fanfics",
    genre: "Contos Eróoticos",
    keywords: "Conto Erótico, Contos Eróticos",
    publisher: "Feminive Fanfics",
    url: "https://feminivefanfics.com.br",
    datePublished: "2024-09-20",
    dateCreated: "2024-09-20",
    dateModified: "2024-09-20",
    description: "Um site de Contos Eróticos para meninas",

    author: {
      "@type": "Person",
      name: "Mariana",
    },
  };

  return (
    <NextHead>
      <title>{title}</title>
      <meta key="title" content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="theme-color" content="#d5a9b4" />
      <meta content={description} name="description" />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={`index: ${index}, follow: ${follow}, nocache: ${nocache}, googlebot: ${JSON.stringify(googleBot)}`}
      />
      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, user-scalable=yes"
      />
      <meta property="og:image" content={image.url} />
      <meta property="og:image:width" content={image.width?.toString()} />
      <meta property="og:image:height" content={image.height?.toString()} />
      <meta property="og:image:alt" content={image.alt} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <link href={icon} rel="icon" />
      <link href={shortcut} rel="shortcut icon" />
      <link href={apple} rel="apple-touch-icon" />
      {other.rel && <link rel={other.rel} href={other.url} />}
      <link rel="canonical" href={canonical} /> {/* Canonical URL */}
      <meta name="twitter:card" content={card} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:image" content={twitterImage} />{" "}
      {/* Use twitterImage here */}
      <meta name="google-site-verification" content={verificationMe[0]} />
      <meta name="yandex-verification" content={yandexVerification} />
      <meta name="msvalidate.01" content={yahooVerification} />
      {verificationBookmarks.map((bookmark, index) => (
        <link key={index} rel="bookmark" href={bookmark} />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </NextHead>
  );
};
