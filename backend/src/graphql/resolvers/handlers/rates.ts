import type { RateLaptopInput, Context } from "../../../types";

export const rateLaptop = (_, { input }: { input: RateLaptopInput }, { request }: Context) => {
    // const user = request.session.user;
    // if (!user) throw new Error("not authorized to perform this action");

    request.rateStore.rateLaptop(input, "userOne");

    return { success: "ok" };
};
