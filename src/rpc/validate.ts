import { Prisma } from "@prisma/client";
import { RPCParamError } from "./errors";

const dmmf = Prisma.dmmf;

const models = dmmf.datamodel.models.map((model) => model.name);
const actions = [
	"findUnique",
	"findFirst",
	"findMany",
	"create",
	"createMany",
	"delete",
	"update",
	"deleteMany",
	"updateMany",
	"upsert",
	"aggregate",
	"groupBy",
	"count",
] as const;

type Action = typeof actions[number];

export type RPCParams = {
	model: Prisma.ModelName;
	action: Action;
	args: unknown;
	runInTransaction: boolean;
};

export function validateRPCParams(params: POJO<string>): RPCParams {
	const { model, action, runInTransaction } = params;

	if (!model || !models.includes(model)) {
		throw new RPCParamError(`Invalid model name: ${model}`);
	}

	if (!action || !actions.includes(action as Action)) {
		throw new RPCParamError(`Invalid action: ${action}`);
	}

	if (typeof runInTransaction !== "boolean") {
		throw new RPCParamError(`Invalid param runInTransaction must be boolean`);
	}

	return {
		model,
		action,
		args: params["args"],
		runInTransaction,
	} as RPCParams;
}
