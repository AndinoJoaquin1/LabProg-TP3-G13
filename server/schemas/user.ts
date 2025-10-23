import mongoose from "mongoose";
import type { User } from "../types";

const userSchema = new mongoose.Schema<User>({
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
