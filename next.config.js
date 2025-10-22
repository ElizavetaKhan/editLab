/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/Users/elizavetahan/Documents/JSprojects/editLab',
  },
  compiler: {
    styledComponents: true, // Включает поддержку SSR styled-components
  },
}
module.exports = nextConfig;
