import Hapi from '@hapi/hapi';
import { routes } from './routes.js';

const bootsrap = async () => {
	const server = Hapi.server({
		port: process.env.PORT ?? 9000,
		host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
		routes: {
			cors: { origin: ['*'] },
		},
	});

	server.route(routes);

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

bootsrap().catch(err => {
	console.error(err);
	process.exit(1);
});
