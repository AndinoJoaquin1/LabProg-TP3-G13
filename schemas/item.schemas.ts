import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    plataforma:{type:String, requiered:true}
})


const ItemModel = mongoose.model('Item', itemSchema);

export default ItemModel;
