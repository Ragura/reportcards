module.exports = {
  plugins: [
    require("postcss-import")({
      path:
        "./node_modules/vue-page-transition/src/components/VuePageTransition.vue"
    }),
    require("tailwindcss"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: [
          `./public/**/*.html`,
          `./src/**/*.vue`,
          "./node_modules/vue-page-transition/src/**/*.vue"
        ],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ""
          );
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          );
        },
        whitelist: [],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/
        ]
      }),
    require("autoprefixer")
  ]
};
