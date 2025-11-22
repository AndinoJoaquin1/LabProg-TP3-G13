import { Router } from "express";
import { createItem, getItemById, getAllItems } from "../controllers/item.controllers";

export const ItemsRoutes: Router = Router()

ItemsRoutes.post("/",createItem)
ItemsRoutes.get("/",getAllItems)
ItemsRoutes.get("/:id",getItemById)