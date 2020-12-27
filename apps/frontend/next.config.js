const images = require("remark-images");
const emoji = require("remark-emoji");
const frontmatter = require("remark-frontmatter");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
        {
          loader: "mdx-frontmatter-loader",
        },
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [
              images,
              emoji,
              [
                frontmatter,
                {
                  type: "yaml",
                  marker: "-",
                  fence: "---",
                },
              ],
            ],
          },
        },
      ],
    });
    return config;
  },
};
