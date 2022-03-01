import { Knex } from "knex";
import { hashSync } from "bcrypt";
import { LaptopInDB, UserInDB, Role, RateInDB } from "../types";

const LAPTOP_SEED: LaptopInDB[] = [
    {
        id: "laptopOne",
        brand: "Apple",
        model: "iMac",
        ram: 16,
        cpu: 8,
        storage: 256,
        price: 1049.0,
        created_by: "userOne",
        image_url: "/public/img/laptopOne.jpeg",
    },
    {
        id: "laptopTwo",
        brand: "Lenovo",
        model: "Launchpad",
        ram: 16,
        cpu: 8,
        storage: 512,
        price: 899.9,
        created_by: "userTwo",
        image_url: "/public/img/laptopThree.jpeg",
    },
    {
        id: "laptopThree",
        brand: "Apple",
        model: "Macbook Pro",
        ram: 32,
        cpu: 8,
        storage: 512,
        price: 1299,
        created_by: "userTwo",
        image_url: "/public/img/laptopTwo.jpeg",
    },
    {
        id: "laptopFour",
        brand: "HP",
        model: "Satelette",
        ram: 16,
        cpu: 8,
        storage: 256,
        price: 699,
        created_by: "userOne",
        image_url: "/public/img/laptopFour.jpeg",
    },
];

const USER_SEED: UserInDB[] = [
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

const RATE_SEED: RateInDB[] = [
    {
        id: "rateOne",
        laptop_id: "laptopOne",
        user_id: "userOne",
        rating: 5,
    },
    {
        id: "rateTwo",
        laptop_id: "laptopTwo",
        user_id: "userTwo",
        rating: 4,
    },
];

export async function up(knex: Knex): Promise<void> {
    await knex("users").insert(USER_SEED);

    LAPTOP_SEED.forEach(async (l) => {
        await knex("laptops").insert(l);
    });

    RATE_SEED.forEach(async (r) => {
        await knex("rates").insert(r);
    });
}

export async function down(knex: Knex): Promise<void> {}
