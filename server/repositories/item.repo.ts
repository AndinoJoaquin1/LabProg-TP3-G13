import ItemModel from "../schemas/item.schemas";
import type { Item } from "../types";

export const ItemRepo = {
  async findItemWithId(id: String) {
    return await ItemModel.findById(id);
  },

  async createItem(data: Item) {
    const newItem = new ItemModel(data);
    return await newItem.save();
  },
};
