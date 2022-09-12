import Fastify from "fastify";

// create fastify instance
const server = Fastify({
	logger: true,
});

export { server };
