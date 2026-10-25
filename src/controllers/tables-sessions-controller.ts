import { NextFunction, Request, Response} from "express"
import { knex } from "@/database/knex"
import { z } from "zod"
import { AppError } from "@/utils/AppError" 

class TableSessionController{
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })

            const { table_id } = bodySchema.parse(request.body)

            const session = await knex<TableSessionsRepository>("tables-sessions").where({ table_id }).orderBy("opened_at", "desc").first()

            // se a mesa n esta aberta(fechada)
            if(session && !session.closed_at) {
                throw new AppError("This table is already open")
            }

            await knex<TableSessionsRepository>("tables-sessions").insert({
                table_id,
                opened_at: knex.fn.now() 
            })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sessions = await knex<TableSessionsRepository>("tables-sessions").select().orderBy("closed_at")

            return response.json(sessions)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: "ID must be a number"})
            .parse(request.params.id)

            const session = await knex<TableSessionsRepository>("tables-sessions").select().where({ id }).first()

            if (!session){
                throw new AppError("Sessions not found")
            }

            if (session.closed_at) {
                throw new AppError("This session table is already closed")
            }

            await knex<TableSessionsRepository>("tables-sessions").update({ closed_at: knex.fn.now()}).where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { TableSessionController }