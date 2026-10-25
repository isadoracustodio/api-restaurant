import { NextFunction, Request, Response} from "express"
import { knex } from "@/database/knex"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class TableController{
    async index(req: Request, resp: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables").select()

            return resp.json(tables)
        } catch (error) {
            next(error)
        }
    }

    async show(req: Request, resp: Response, next: NextFunction) {
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: "ID must be a number"})
            .parse(req.params.id)

            const table = await knex<TableRepository>("tables").select().where({ id }).first()

            if (!table) {
                throw new AppError("Table not found")
            }

            return resp.json(table)
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, resp: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_number: z.number({ required_error: "table number is required" }).gt(0, { message: "table number must be greather than 0" })
            })

            const { table_number } = bodySchema.parse(req.body)

            await knex<TableRepository>("tables").insert({ table_number })

            return resp.status(201).json()
        } catch (error) {
            next(error)
        }
    }


    async update(req: Request, resp: Response, next: NextFunction) {
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value))
            .parse(req.params.id)

            const table = await knex<TableRepository>("tables").select().where({ id }).first()

            if (!table) {
                throw new AppError("Table not found")
            }

            const bodySchema = z.object({
                table_number: z.number({ required_error: "table number is required" }).gt(0, { message: "table number must be greather than 0" })
            })

            const { table_number } = bodySchema.parse(req.body)

            await knex<TableRepository>("tables").update({ table_number, updated_at: knex.fn.now() }).where({ id })

            return resp.json()
        } catch (error) {
            next(error)
        }
    }

    async remove(req: Request, resp: Response, next: NextFunction) {
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value))
            .parse(req.params.id)

            const table = await knex<TableRepository>("tables").select().where({ id }).first()

            if (!table) {
                throw new AppError("Table not found")
            }

            await knex<TableRepository>("tables").delete().where({ id })

            return resp.json()
        } catch (error) {
            next(error)
        }
    }
}

export { TableController }