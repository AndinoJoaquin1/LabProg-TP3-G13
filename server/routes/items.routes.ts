import { Router } from "express";
import { CreateItem } from "../controllers/ItemsControllers";

export const ItemsRoutes: Router = Router()

ItemsRoutes.post("/create",CreateItem)