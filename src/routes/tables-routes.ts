import { Router } from "express"
import { TableController } from "@/controllers/tables-controller"

const tablesRoutes = Router()
const tablesController = new TableController()

tablesRoutes.get("/", tablesController.index)
tablesRoutes.get("/:id", tablesController.show)
tablesRoutes.get("/", tablesController.create)
tablesRoutes.get("/:id", tablesController.update)
tablesRoutes.get("/:id", tablesController.remove)

export { tablesRoutes }