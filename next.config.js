/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PRIVATE_URL: "https://feminivefanfics.com.br",
    TOKEN:
      "0f6647d58f96bbe3f9248a0faf3645b8702e9985addc0d6b8087a8c99f4b142d7bf108ad0a6b42d27249bc45e4882a8dcc0f9ef74d32e9112f6420596f06fd6146e86965216278ae04fcf44551919ce1efe6e956325a209f6e63b64833c75689e27bf7b3a26dd1675244617f169fefce12dc24cc2d2bab63a916da8c99e1c9cd",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
