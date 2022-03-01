import { compareSync } from "bcrypt";
import { Context, LoginRegisterUserInput, User } from "../../../types";

export const register = async (_, { input }: { input: LoginRegisterUserInput }, { request }: Context) => {
    await request.userStore.addUser(input);

    return { success: "ok" };
};

export const login = async (_, { input }: { input: LoginRegisterUserInput }, { request }: Context) => {
    const { email, password } = input;

    const user = await request.userStore.getUser(email);
    if (!user) throw new Error("Email or password is wrong");

    if (compareSync(password, user.password)) {
        request.session.user = user;

        return { success: "ok" };
    }

    throw new Error("Email or password is wrong");
};

export const logout = async (_, __, { request }: Context) => {
    const user = request.session.user;
    if (!user) throw new Error("not logged in");

    request.destroySession((err) => {
        if (err) throw new Error("something went wrong. Please try again!");
    });

    return { success: "ok" };
};
