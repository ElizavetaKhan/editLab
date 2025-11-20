/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  compiler: {
    styledComponents: true, // Включает поддержку SSR styled-components
  },
}
module.exports = nextConfig;
