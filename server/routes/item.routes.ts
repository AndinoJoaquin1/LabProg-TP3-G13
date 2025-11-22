import { Router } from "express";
import { CreateItem } from "../controllers/item.controllers";

export const ItemsRoutes: Router = Router()

ItemsRoutes.post("/create",CreateItem)