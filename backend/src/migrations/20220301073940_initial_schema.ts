import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable("users", function (table) {
            table.string("id", 255).notNullable().unique();
            table.string("email", 255).notNullable().unique();
            table.string("password", 255).notNullable();
            table.string("role").notNullable().defaultTo("user");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("laptops", function (table) {
            table.string("id", 255).notNullable().unique();
            table.string("brand", 255).notNullable();
            table.string("model", 255).notNullable();
            table.string("image_url").defaultTo("/public/img/laptopOne.jpeg");
            table.integer("ram").notNullable();
            table.integer("cpu").notNullable();
            table.integer("storage").notNullable();
            table.float("price").notNullable();
            table.string("created_by").references("users.id");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("rates", function (table) {
            table.string("id", 255).notNullable().unique();
            table.string("user_id").references("users.id");
            table.string("laptop_id").references("laptops.id");
            table.integer("rating").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("rates").dropTable("laptops").dropTable("users");
}
