import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // 如果你项目里还有别的外链图源，按行添加：
      // { protocol: "https", hostname: "cdn.yoursite.com" },
    ],
  },
  // 🔧 可选：先让构建不因 ESLint 挂掉（救急用，修好 any 后建议移除）
  // eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
