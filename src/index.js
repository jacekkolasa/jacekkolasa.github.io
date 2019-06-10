import http from 'http';

// eslint-disable-next-line import/no-dynamic-require
let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }

  console.log('🚀 started'); // eslint-disable-line no-console
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!'); // eslint-disable-line no-console

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...'); // eslint-disable-line no-console

    try {
      // eslint-disable-next-line global-require
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  });
}
