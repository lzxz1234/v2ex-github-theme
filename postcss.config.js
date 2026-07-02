module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    ...(ctx.env === 'production' ? { cssnano: {} } : {}),
  },
});
