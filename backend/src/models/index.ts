import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import InDBLaptopStore, { LaptopStore } from "./laptop-store";
import InDBUserStore, { UserStore } from "./user-store";
import InDBRateStore, { RateStore } from "./rate-store";

declare module "fastify" {
    interface FastifyRequest {
        laptopStore: LaptopStore;
        userStore: UserStore;
        rateStore: RateStore;
    }
}

const stores: FastifyPluginAsync = async (app) => {
    const laptopStore = new InDBLaptopStore(app.getDB);
    const userStore = new InDBUserStore(app.getDB);
    const rateStore = new InDBRateStore(app.getDB);

    app.addHook("onRequest", async (req) => {
        req.laptopStore = laptopStore;
        req.userStore = userStore;
        req.rateStore = rateStore;
    });
};

export default fp(stores);
