import UserModel from "../schemas/user.schemas";
import { genSaltSync, hashSync } from 'bcrypt';
import type { User } from "../types";


export const UserRepo = {
    async findUserWithEmail(email: String) { return await UserModel.findOne({ email }) },

    async createUser(data: User) {

        const { email, nickname, password } = data;
        //se hashea la password
        const salt = genSaltSync();
        const hashedPassword = hashSync(password, salt);

        //se agrega el user a la coleccion
        const newUser = new UserModel({ nickname, email, password: hashedPassword })
        return await newUser.save()

    }
    /*
        ...
    */
}