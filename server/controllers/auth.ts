import 'dotenv/config';
import type { Request, Response } from 'express';
import type { User } from '../types';
import { genSaltSync, hashSync } from 'bcrypt';
import UserModel from '../schemas/user';


//funcion para crear un usuario en la db
export const createUser = async (req: Request<{}, {}, User>, res: Response) => {
    const { email, password, nickname } = req.body;     //se destrucctura el body de la request
    try {
        //se verifica que no exista un user con el mismo email
        const findUser = await UserModel.findOne({email});
        if(findUser){
            return res.status(400).json({
                msg:'Email is already use'
            })
        }

        //se hashea la password
        const salt = genSaltSync();
        const hashedPassword = hashSync(password,salt);

        //se agrega el user a la coleccion
        const newUser = new UserModel ({nickname,email,password:hashedPassword})
        await newUser.save()

        //res ok
        res.status(200).json({
            msg: 'User registered successfully',
            uid: newUser._id,
            nickname,
            hashedPassword
        })
    } catch (error) {
        console.log(error);//debugging
        return res.status(500).json({//error generico
            msg:'Internal server error'
        })
    }
}