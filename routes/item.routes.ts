import { Router } from "express";
import { createItem, getItemById, getAllItems,getItemsByNameMatch } from "../controllers/item.controllers";

export const ItemsRoutes: Router = Router()

ItemsRoutes.post("/",createItem)
ItemsRoutes.get("/",getAllItems)
ItemsRoutes.get("/:id",getItemById)
ItemsRoutes.get("/:exp",getItemsByNameMatch)