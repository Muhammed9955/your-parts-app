import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').nextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
