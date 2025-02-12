import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://cplat-io.github.io/ai-agent-front/"
      : "",
};

export default nextConfig;
