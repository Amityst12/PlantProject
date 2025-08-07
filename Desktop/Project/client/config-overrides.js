const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

const alias = addWebpackAlias({
  "@": path.resolve(__dirname, "src")
});

module.exports = {
  webpack: override(alias),
  jest: config => {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      "^@/(.*)$": "<rootDir>/src/$1"
    };
    config.transformIgnorePatterns = config.transformIgnorePatterns.map(pattern =>
      pattern.replace("node_modules", "node_modules/(?!@base44/sdk)")
    );
    return config;
  }
};
