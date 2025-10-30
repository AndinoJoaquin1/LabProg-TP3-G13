import { Router } from "express";
import { check } from "express-validator";
import { createUser } from "../controllers/AuthControllers";
import { validateInputs } from "../middlewares/validateInputs";

export const authRouter: Router = Router();

//ruta para el registro de un usuario, con sus validaciones
authRouter.post("/register", [
    check("nickname", "Nickname is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "The password must be 6 digits long").isLength({ min: 6 }),
    validateInputs,
], createUser
);
