import type { NextFunction, Request, Response } from "express";

export const validateCreateItem = (req: Request, res: Response, next: NextFunction) => {
    const { nombre, precio, image, plataforma } = req.body;

    if (!nombre) {
        return res.status(400).json({
            error: "El campo 'nombre' es obligatorio"
        });
    }

    if (typeof nombre !== "string") {
        return res.status(400).json({
            error: "El campo 'nombre' debe ser de tipo string"
        });
    }

    if (!precio) {
        return res.status(400).json({
            error: "El campo 'precio' es obligatorio"
        });
    }

    if (typeof precio !== "string") {
        return res.status(400).json({
            error: "El campo 'precio' debe ser de tipo string"
        });
    }

    if (!image) {
        return res.status(400).json({
            error: "El campo 'image' es obligatorio"
        });
    }

    if (typeof image !== "string") {
        return res.status(400).json({
            error: "El campo 'image' debe ser de tipo string"
        });
    }

    if (!plataforma) {
        return res.status(400).json({
            error: "El campo 'plataforma' es obligatorio"
        });
    }

    if (typeof plataforma !== "string") {
        return res.status(400).json({
            error: "El campo 'plataforma' debe ser de tipo string"
        });
    }


    next();
};