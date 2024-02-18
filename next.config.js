/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
}


module.exports = {
  images: {
    domains: ['localhost', '127.0.0.1', 'fiverr-res.cloudinary.com'],
  },

};

