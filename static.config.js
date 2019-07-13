import path from 'path';

export default {
  siteRoot: 'https://jacekkolasa.github.io',
  entry: path.join(__dirname, 'src', 'index.tsx'),
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
    'react-static-plugin-typescript',
    'react-static-plugin-react-router',
    'react-static-plugin-css-modules',
  ],
};
