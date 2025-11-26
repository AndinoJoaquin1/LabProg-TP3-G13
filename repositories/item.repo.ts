import ItemModel from "../schemas/item.schemas";
import type { Item } from "../types";
import { getItemById } from './../controllers/item.controllers';

export const ItemRepo = {
  async findItemWithId(id: any) {
    return await ItemModel.findById(id);
  },

  async createItem(data: Item) {
    const newItem = new ItemModel(data);
    return await newItem.save();
  },

  async getItemsByNameMatch(exp:string){
    //el $options: "i" es para que el filtrado no distinga mayus/minus
   return await ItemModel.find({ nombre: { $regex: exp, $options: "i"} });
  },

  //temporal
  async getAllItems() {
    return await ItemModel.find({});
  },
};
