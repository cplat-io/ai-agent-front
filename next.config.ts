import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProduction ? "export" : "standalone",
  assetPrefix: isProduction ? "https://cplat-io.github.io/ai-agent-front/" : "",
};

export default nextConfig;
