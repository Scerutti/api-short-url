const config = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.build.json --noEmit",
  "*.{js,jsx,ts,tsx}": [
    "npm run lint",
    "jest --findRelatedTests --passWithNoTests",
  ],
  "*.{md,json}": "prettier --write",
};

module.exports = config;