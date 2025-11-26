import { Router } from "express";
import { check } from "express-validator";
import { createUser } from "../controllers/auth.controllers";

export const AuthRouter: Router = Router();

//ruta para el registro de un usuario, con sus validaciones
AuthRouter.post("/register", [
], createUser
);
