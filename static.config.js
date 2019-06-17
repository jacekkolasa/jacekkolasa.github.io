// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at httsp://react-static.js.org

export default {
  siteRoot: 'https://jacekkolasa.github.io',
  getSiteData: () => ({
    title: 'Parental Tools',
  }),
  getRoutes: () => [
    // hack so there is not error in console for dynamic routes
    {
      path: '/',
      template: 'src/routes/NotFound/NotFound.js',
    },
    {
      path: '*',
      template: 'src/routes/NotFound/NotFound.js',
    },
  ],
  maxThreads: 1, // Remove this when you start doing any static generation
  plugins: [
    'react-static-plugin-react-router',
    'react-static-plugin-css-modules',
  ],
};
