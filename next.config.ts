import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the project root (avoids a warning when a stray lockfile exists in a parent folder).
  turbopack: { root: path.resolve(__dirname) },
  // Next 16 auto-generates AGENTS.md/CLAUDE.md files for AI tools; not needed in a client template.
  agentRules: false,
};

export default nextConfig;
