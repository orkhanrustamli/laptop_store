import path from "path";
import fastify from "fastify";
import cookie from "fastify-cookie";
import session from "@fastify/session";

import type { User } from "./types";

/* Plugins */
import db from "./plugins/db";
import stores from "./models";

const SESSION_SECRET = "very very very very very very very very long secret";

const app = fastify({ logger: true });

declare module "fastify" {
    interface Session {
        user: User;
    }
}

app.register(cookie)
    .register(session, { secret: SESSION_SECRET, saveUninitialized: false, cookie: { secure: false } })
    .register(db)
    .register(stores)
    .register(require("fastify-static"), {
        root: path.join(__dirname, "img"),
        prefix: "/public/img/",
    });

export default app;
