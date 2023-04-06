const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// next.config.js
module.exports = withPWA({
  images: {
    domains: ["res.cloudinary.com", "unsplash.com"],
  },
});
