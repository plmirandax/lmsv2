/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@react-email/render', '@react-email/tailwind']
    }
};

export default nextConfig;
