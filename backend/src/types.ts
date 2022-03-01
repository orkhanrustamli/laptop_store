import { FastifyReply, FastifyRequest } from "fastify";

export type Laptop = {
    id: string;
    brand: string;
    model: string;
    ram: number;
    cpu: number;
    storage: number;
    price: number;
    createdBy: string;
    imageURL?: string;
    createdAt?: string;
};

export type LaptopInDB = Omit<Laptop, "createdBy" | "createdAt" | "imageURL"> & {
    created_by: string;
    created_at?: string;
    image_url?: string;
};

export type CreateLaptopInput = Omit<Laptop, "id" | "createdBy" | "imageURL" | "createdAt">;

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

export type User = {
    id: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: string;
};

export type UserInDB = Omit<User, "createdAt"> & { created_at?: string };

export type LoginRegisterUserInput = {
    email: string;
    password: string;
};

export type Rate = {
    id: string;
    userId: string;
    laptopId: string;
    rating: number;
    createdAt?: string;
};

export type RateInDB = Pick<Rate, "id" | "rating"> & {
    user_id: string;
    laptop_id: string;
    created_at?: string;
};

export type RateLaptopInput = Omit<Rate, "id" | "userId">;

export type LaptopRatings = {
    count: number;
    avg: number;
};

export type Context = {
    request: FastifyRequest;
    reply: FastifyReply;
};
