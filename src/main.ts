import { server } from "./server";

import "./rpc/rpc";

async function main() {
	server.listen(
		{
			port: 3000,
		},
		(err, address) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			server.log.info(`server listening on ${address}`);
		}
	);
}

main()
	.then(() => {})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
