import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

//se valida la informacion del resquest, capa de abstraccion que no entiendo un pingo
export const validateInputs = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);//validacion de la lib
    console.log(errors.mapped())
    //response si se encuentra un error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.mapped()
        })
    }

    next();//se continua con el siguiente middleware/endpoint
}