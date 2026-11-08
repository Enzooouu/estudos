import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Site 100% estático: gera HTML pronto em /out, que pode ser hospedado em qualquer lugar.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
