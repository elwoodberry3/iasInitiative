/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: no `output: 'export'`. This build has server-side API routes
  // (/api/lead, /api/track) that proxy to n8n. Static export is incompatible
  // with route handlers — deploy as a standard Vercel serverless app.
};

export default nextConfig;
