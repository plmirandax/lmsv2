/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@react-email/render', '@react-email/tailwind']
    },
    images: {
        domains: [
          'uploadthing.com',
          'utfs.io',
          'img.clerk.com',
          'subdomain',
          'files.stripe.com',
        ],
      },
      reactStrictMode: false,
};

export default nextConfig;
