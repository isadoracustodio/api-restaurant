import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        { name: "Pizza Margherita", price: "42.90" },
        { name: "Hambúrguer Artesanal", price: "34.50" },
        { name: "Lasanha à Bolonhesa", price: "38.00" },
        { name: "Salada Caesar", price: "27.90" },
        { name: "Sushi Combo 20 Peças", price: "69.90" },
        { name: "Pastel de Carne", price: "9.50" },
        { name: "Coxinha de Frango", price: "7.00" },
        { name: "Açaí 500ml", price: "22.00" },
        { name: "Pão de Queijo (6 un.)", price: "12.90" },
        { name: "Brigadeiro Gourmet", price: "5.50" }
    ]);
};
