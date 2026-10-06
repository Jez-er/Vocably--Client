import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Spring server has no CORS configuration, so the browser cannot talk to :8080 directly.
  // Proxying keeps API calls same-origin: no preflight, and Spring's `Set-Cookie: refreshToken`
  // arrives as a first-party cookie (which also avoids SameSite=Lax breaking on a split-domain
  // deploy). Client code only ever sees NEXT_PUBLIC_API_BASE_URL.
  async rewrites() {
    const target = process.env.API_PROXY_TARGET ?? "http://localhost:8080";

    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
};

export default nextConfig;
