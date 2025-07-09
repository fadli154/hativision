// next.config.js
const withNextIntl = require("next-intl/plugin");
const intlConfig = require("./next-intl.config.js");

const nextConfig = {
  // Konfigurasi tambahan kalau ada
};

module.exports = withNextIntl(intlConfig)(nextConfig);
