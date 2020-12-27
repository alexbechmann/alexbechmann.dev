const images = require("remark-images");
const emoji = require("remark-emoji");
const frontmatter = require("remark-frontmatter");
const rehypePrism = require("@mapbox/rehype-prism");

module.exports = {
  /**
   * @param {import('webpack').Configuration} config
   * @param {{ buildId: string, dev: boolean, isServer: boolean }} options
   */
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
            rehypePlugins: [rehypePrism],
            remarkPlugins: [
              [
                frontmatter,
                {
                  type: "yaml",
                  marker: "-",
                },
              ],
            ],
            images,
            emoji,
          },
        },
      ],
    });
    return config;
  },
};
