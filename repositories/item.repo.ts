import ItemModel from "../schemas/item.schemas";
import type { Item } from "../types";

export const ItemRepo = {
  async findItemWithId(id: any) {
    return await ItemModel.findById(id);
  },

  async createItem(data: Item) {
    const newItem = new ItemModel(data);
    return await newItem.save();
  },

  async getItemsByNameMatch(exp: string) {
    //el $options: "i" es para que el filtrado no distinga mayus/minus
    return await ItemModel.find({ nombre: { $regex: exp, $options: "i" } });
  },

  async getItemsByCantidad(from:number, limit:number) {
    return await ItemModel.find({})
      .skip(from)
      .limit(limit);
  
  },

  //temporal
  async getAllItems() {
    return await ItemModel.find({});
  },
};
