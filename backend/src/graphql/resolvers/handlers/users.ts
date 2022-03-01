import { Context } from "../../../types";

export const users = (_, __, { request, reply }: Context) => {
    return request.userStore.getUsers();
};

export const user = (_, { id }: { id: string }, { request }: Context) => {
    return request.userStore.getUser(id);
};
