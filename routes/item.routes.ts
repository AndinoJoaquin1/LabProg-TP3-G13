import { Router } from "express";
import { createItem, getItemById, getAllItems,getItemsByNameMatch, getItemsByCantidad } from "../controllers/item.controllers";
import { validateCreateItem } from "../middleware/validate-item";

export const ItemsRoutes: Router = Router()

ItemsRoutes.get("/",getItemsByCantidad)
ItemsRoutes.post("/",validateCreateItem,createItem)
ItemsRoutes.get("/",getAllItems)
ItemsRoutes.get("/:id",getItemById)
ItemsRoutes.get("/:exp",getItemsByNameMatch)