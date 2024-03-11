import Hapi from '@hapi/hapi';

const bootsrap = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  server.start();
  console.log(`Server running on ${server.info.uri}`);
};

bootsrap();
