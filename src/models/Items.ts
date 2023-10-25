import { Document, Schema, model } from "mongoose";

interface IItem extends Document {
  name: string;
  description: string;
  price: string;
  image?: string;
}

const ItemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Item = model<IItem>("Item", ItemSchema);

export default Item;
