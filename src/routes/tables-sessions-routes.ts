import { Router } from "express"
import { TableSessionController } from "@/controllers/tables-sessions-controller"

const tablesSessionsRoutes = Router()
const tablesSessionsController = new TableSessionController()

tablesSessionsRoutes.post("/", tablesSessionsController.create)
tablesSessionsRoutes.get("/", tablesSessionsController.index)
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update)

export { tablesSessionsRoutes }