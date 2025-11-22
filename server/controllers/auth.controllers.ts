import 'dotenv/config';
import type { Request, Response } from 'express';
import type { User } from '../types';;
import { UserRepo } from '../repositories/user.repo';


//funcion para crear un usuario en la db
export const createUser = async (req: Request<{}, {}, User>, res: Response) => {
    try {
        //se verifica que no exista un user con el mismo email
        const userExists = await UserRepo.findUserWithEmail(req.body.email);
        if (userExists) {
            return res.status(400).json({
                msg: 'Email is already use'
            })
        }

        const newUser = UserRepo.createUser(req.body);
        //res ok
        res.status(200).json({
            msg: 'User registered successfully',
            newUser
        })
    } catch (error) {
        console.log(error);//debugging
        return res.status(500).json({//error generico
            msg: 'Internal server error'
        })
    }
}