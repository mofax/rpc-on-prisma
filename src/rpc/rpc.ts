import { PrismaClient } from "@prisma/client";
import { unCapitalize } from "../tools/strings";
import { validateRPCParams } from "./validate";

class PrismaRPC {
	client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}
	async exec(payload: POJO<string>) {
		const valid = validateRPCParams(payload);
		const clientModelGetter = unCapitalize(valid.model);
		const modelDelagate = this.client[clientModelGetter];
		const action = modelDelagate[valid.action];
		// @ts-ignore
		return await action(valid.args);
	}
}

export default PrismaRPC;
