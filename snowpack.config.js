/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/' },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-webpack',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Experimental bundling: */
    // bundle: true,
    // splitting: true,
    // minify: true,
    // target: 'es2018',
    // treeshake: true,
  },
  packageOptions: {
    source: 'local',
  },
  devOptions: {
    open: 'chrome',
  },
  buildOptions: {
    /* ... */
  },
};
