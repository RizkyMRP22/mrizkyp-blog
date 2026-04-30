import type { NextConfig } from "next";

const blobStorageUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || "";
const blobStorageHostname = blobStorageUrl ? new URL(blobStorageUrl).hostname : "";

const securityHeaders = [
  {
    // Disable DNS prefetching to prevent information leakage via pre-resolved hostnames
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    // Force HTTPS for 2 years and include subdomains
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Prevent embedding in iframes (clickjacking protection)
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Stop browsers from MIME-sniffing away from declared content-type
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Only send origin on cross-origin requests, no path/query leakage
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Restrict access to browser features
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Legacy XSS protection for older browsers
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Prevent cross-origin leakage of the window object
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    // Content Security Policy
    // - default-src 'self'          → only allow resources from the same origin by default
    // - script-src 'self' 'unsafe-inline' 'unsafe-eval' → Next.js requires these for hydration
    // - style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
    // - font-src 'self' https://fonts.gstatic.com
    // - img-src 'self' data: blob: https:  → allow CDN/external images (Unsplash, etc.)
    // - connect-src 'self'                 → fetch / XHR / WebSocket
    // - frame-src ...                      → allow embedding from approved media hosts
    // - frame-ancestors 'none'             → mirrors X-Frame-Options DENY for modern browsers
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https: " + blobStorageUrl,
      "connect-src 'self' https://challenges.cloudflare.com",
      `frame-src https://drive.google.com https://docs.google.com https://www.youtube.com https://www.loom.com ${blobStorageUrl} https://challenges.cloudflare.com`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: blobStorageHostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

