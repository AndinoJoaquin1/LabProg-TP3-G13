import mongoose from "mongoose";

//crea un nuevo esquema User, 
const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

//y luego crea el modelo a partir de ese esquema, crea un model
//el model contiene las funciones para crear un objeto con los atributos definidos en el esquema
//y todas las fuciones relacionadas con mongo (create,find,etc)
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
