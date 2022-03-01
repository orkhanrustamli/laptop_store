import { Knex } from "knex";
import { v4 as uuid } from "uuid";
import { Laptop, CreateLaptopInput } from "../types";

export interface LaptopStore {
    getLaptops(): Promise<Laptop[]>;
    getLaptop(id: string): Promise<Laptop | null>;
    createLaptop(input: CreateLaptopInput, createdBy?: string): Promise<Laptop>;
    deleteLaptop(id: string): Promise<void>;
}

export class InMemoryLaptopStore implements LaptopStore {
    private _laptops: Laptop[] = [];

    async getLaptops(): Promise<Laptop[]> {
        return this._laptops;
    }

    async getLaptop(id: string): Promise<Laptop | null> {
        const laptop = this._laptops.find((l) => l.id === id);

        return !laptop ? null : laptop;
    }

    async createLaptop(input: CreateLaptopInput, createdBy: string = "userOne"): Promise<Laptop> {
        const id = uuid();
        const laptop: Laptop = { ...input, id, createdBy, imageURL: "/public/img/laptopOne.jpeg" };

        this._laptops.push(laptop);

        return laptop;
    }

    async deleteLaptop(id: string): Promise<void> {
        const index = this._laptops.findIndex((l) => l.id === id);
        if (index < 0) throw new Error(`No laptop was found with this id: ${id}`);

        this._laptops.splice(index, 1);
    }
}

class InDBLaptopStore implements LaptopStore {
    constructor(private getDB: (transacted?: boolean) => Promise<Knex>) {}

    async getLaptops(): Promise<Laptop[]> {
        console.log("HEEEEY", this.getDB);

        try {
            const db = await this.getDB();
            const laptops = await db<Laptop>("laptops");

            return laptops;
        } catch (error) {
            console.log("Error happened while fetching laptops:", error);
            throw error;
        }
    }

    async getLaptop(id: string): Promise<Laptop | null> {
        try {
            const db = await this.getDB();
            const laptop = await db<Laptop>("laptops").where("id", id).first();

            if (!laptop) return null;

            return laptop;
        } catch (error) {
            console.log(`Error happened while fetching laptop with id: ${id}, err:`, error);
            throw error;
        }
    }

    async createLaptop(input: CreateLaptopInput, createdBy?: string): Promise<Laptop> {
        try {
            const db = await this.getDB();

            const id = uuid();

            await db("laptops").insert({ ...input, id, created_by: createdBy });
            const laptop = await this.getLaptop(id);

            return laptop as Laptop;
        } catch (error) {
            console.log("Error happened while trying to create laptop:", error);
            throw error;
        }
    }

    async deleteLaptop(id: string): Promise<void> {
        try {
            const db = await this.getDB();

            await db("laptops").where("id", id).del();
        } catch (error) {
            console.log(`Error happened while trying to delete laptop with id: ${id}, error:`, error);
            throw error;
        }
    }
}

export default InDBLaptopStore;
