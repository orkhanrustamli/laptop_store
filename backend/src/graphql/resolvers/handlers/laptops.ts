import { Context, CreateLaptopInput, User, Role } from "../../../types";

export const laptops = async (_, __, { request }: Context) => {
    const laptops = await request.laptopStore.getLaptops();
    console.log(laptops);
    return laptops;
    // return await request.laptopStore.getLaptops();
};

export const laptop = async (_, { id }: { id: string }, { request }: Context) => {
    return await request.laptopStore.getLaptop(id);
};

export const createLaptop = async (_, { input }: { input: CreateLaptopInput }, { request }: Context) => {
    // const user = request.session.user as User;
    // if (user?.role !== Role.ADMIN) throw new Error("You are not authorized to perform this action");

    const laptop = await request.laptopStore.createLaptop(input);
    return laptop;
};

export const deleteLaptop = async (_, { id }: { id: string }, { request }: Context) => {
    // const user = request.session.user as User;
    // if (user?.role !== Role.ADMIN) throw new Error("You are not authorized to perform this action");

    await request.laptopStore.deleteLaptop(id);
    return { success: "ok" };
};
