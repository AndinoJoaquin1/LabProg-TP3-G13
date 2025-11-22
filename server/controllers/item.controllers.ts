import type { Request, Response } from "express";
import type { Item } from "../types";
import { ItemRepo } from "../repositories/item.repo";

export const CreateItem = async (req: Request<{}, {}, Item>, res: Response) => {
    try {
        const newItem = ItemRepo.createItem(req.body)
        res.status(200).json({
            msg: "item creado correctamente",
            newItem
        })
    } catch (error) {
        res.status(500).json({
            msg:"internal server error"
        })
    }

}