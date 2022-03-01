import { Knex } from "knex";
import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";
import { User, Role, LoginRegisterUserInput } from "../types";

export interface UserStore {
    getUsers(): Promise<User[]>;
    getUser(email: string): Promise<User | null>;
    addUser(input: LoginRegisterUserInput, role?: Role): Promise<void>;
}

const USER_SEED: User[] = [
    {
        id: "userOne",
        email: "userOne@gmail.com",
        password: hashSync("passwordOne", 10),
        role: Role.ADMIN,
    },
    {
        id: "userTwo",
        email: "userTwo@gmail.com",
        password: hashSync("passwordTwo", 10),
        role: Role.USER,
    },
];

export class InMemoryUserStore implements UserStore {
    private _users: User[] = USER_SEED;

    async getUsers(): Promise<User[]> {
        return this._users;
    }

    async getUser(email: string): Promise<User | null> {
        const user = this._users.find((u) => u.email === email);

        return !user ? null : user;
    }

    async addUser(input: LoginRegisterUserInput, role: Role = Role.USER): Promise<void> {
        const id = uuid();

        this._users.push({ ...input, id, role });
    }
}

class InDBUserStore implements UserStore {
    constructor(private getDB: (transacted?: boolean) => Promise<Knex>) {}

    async getUsers(): Promise<User[]> {
        try {
            const db = await this.getDB();

            return await db<User>("users");
        } catch (error) {
            console.log("Error happened while querying users from db:", error);
            throw error;
        }
    }

    async getUser(email: string): Promise<User | null> {
        try {
            const db = await this.getDB();

            const user = await db<User>("users").where("email", email).first();

            if (!user) return null;

            return user;
        } catch (error) {
            console.log(`Error happened while fetching laptop with email: ${email}, err:`, error);
            throw error;
        }
    }

    async addUser(input: LoginRegisterUserInput, role: Role = Role.USER): Promise<void> {
        try {
            const db = await this.getDB();

            const id = uuid();
            await db("users").insert({ ...input, id, role });
        } catch (error) {
            console.log("Error happened while trying to insert user into db:", error);
            throw error;
        }
    }
}

export default InDBUserStore;
