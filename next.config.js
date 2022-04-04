/** @type {import('next').NextConfig} */

const bundleAnalyzer = require('@next/bundle-analyzer');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {tribeGQLHost: 'https://app.tribe.so/graphql'},
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
