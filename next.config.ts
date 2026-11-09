import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Site 100% estático: gera HTML pronto em /out, que pode ser hospedado em qualquer lugar.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // esconde o selo "N" do Next.js que aparece no canto durante o desenvolvimento
  devIndicators: false,
};

export default nextConfig;
