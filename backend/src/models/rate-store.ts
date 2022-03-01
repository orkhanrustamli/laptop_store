import { Knex } from "knex";
import { v4 as uuid } from "uuid";
import { Rate, RateLaptopInput } from "../types";

export interface RateStore {
    rateLaptop(input: RateLaptopInput, userId: string): Promise<void>;
    getLaptopRatings(laptopId: string): Promise<Rate[]>;
}

export class InMemoryRateStore implements RateStore {
    private _rates: Rate[] = [];

    async rateLaptop(input: RateLaptopInput, userId: string): Promise<void> {
        const id = uuid();

        this._rates.push({ ...input, userId, id });
    }

    async getLaptopRatings(laptopId: string): Promise<Rate[]> {
        return this._rates.filter((r) => r.laptopId === laptopId);
    }
}

class InDBRateStore implements RateStore {
    constructor(private getDB: (transacted?: boolean) => Promise<Knex>) {}

    async rateLaptop(input: RateLaptopInput, userId: string): Promise<void> {
        try {
            const db = await this.getDB();

            const id = uuid();

            await db("rates").insert({ laptop_id: input.laptopId, user_id: userId, id, rating: input.rating });
        } catch (error) {
            console.log("Error happened while trying to insert rating into db:", error);
            throw error;
        }
    }

    async getLaptopRatings(laptopId: string): Promise<Rate[]> {
        try {
            const db = await this.getDB();

            return await db<Rate>("rates").where("laptop_id", laptopId);
        } catch (error) {
            console.log("Error happened while trying to fetch rates from db:", error);
            throw error;
        }
    }
}

export default InDBRateStore;
