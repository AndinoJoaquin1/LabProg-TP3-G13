import mongoose from "mongoose";
import type { User } from "../types";

//crea un nuevo esquema User, 
const userSchema = new mongoose.Schema<User>({
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

//y luego crea el modelo a partir de ese esquema, crea un model
//el model contiene las funciones para crear un objeto con los atributos definidos en el esquema
//y todas las fuciones relacionadas con mongo (create,find,etc)
const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
