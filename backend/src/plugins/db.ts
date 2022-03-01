import camelcase from "camelcase";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import knex, { Knex } from "knex";
import path from "path";
import config from "../config";

declare module "fastify" {
    interface FastifyRequest {
        getDB: (transacted?: boolean) => Promise<Knex>;
    }
    interface FastifyInstance {
        getDB: (transacted?: boolean) => Promise<Knex>;
    }
}

const db: FastifyPluginAsync = async (app) => {
    const _db: Knex = knex({
        client: "mysql",
        connection: {
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            dateStrings: true,
        },
        postProcessResponse: (result, queryContext) => {
            if (Array.isArray(result)) {
                return result.map((r) => snakeToCamel(r));
            }

            return snakeToCamel(result);
        },
    });

    await _db.migrate.latest({
        directory: path.join(__dirname, "../migrations"),
    });

    app.decorateRequest("getDB", async function (transacted: boolean = false) {
        if (transacted) return await _db.transaction();

        return _db;
    });

    app.decorate("getDB", async function (transacted: boolean = false) {
        if (transacted) return await _db.transaction();

        return _db;
    });
};

export const snakeToCamel = (
    row: Record<string, unknown> | null | undefined
): Record<string, unknown> | null | undefined => {
    if (!row) return row;

    const converted: Record<string, unknown> = {};

    Object.keys(row).forEach((k) => {
        converted[camelcase(k)] = row[k];
    });

    return converted;
};

export default fp(db);
