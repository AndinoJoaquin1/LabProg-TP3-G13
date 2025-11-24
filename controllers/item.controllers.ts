import type { Request, Response } from "express";
import type { Item } from "../types";
import { ItemRepo } from "../repositories/item.repo";
import { SourceTextModule } from "vm";

export const createItem = async (req: Request<{}, {}, Item>, res: Response) => {
    try {
        const newItem = await ItemRepo.createItem(req.body)
        res.status(200).json({
            msg: "item creado correctamente",
            newItem
        })
    } catch (error) {
        res.status(500).json({
            msg: "internal server error"
        })
    }

}

export const getAllItems = async (req:Request,res: Response) => {
    try {
        const items = await ItemRepo.getAllItems()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({
            msg: "internal server error"
        })
    }
}

export const getItemById = async (req: Request, res: Response) => {
    try {
        const item = await ItemRepo.findItemWithId(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({
            msg: "internal server error"
        })
    }
}