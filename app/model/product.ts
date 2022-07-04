import { Mongoose, Schema } from "mongoose";
export interface IIngredient {
  weight: Number;
  ingredientId: Schema.Types.ObjectId;
}
export interface IProduct {
  name: string;
  innerName: string;
  price: Number;
  ingredients: IIngredient[];
}
export default (app) => {
  const mongoose: Mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const IngredientSchema = new Schema<IIngredient>({
    weight: Number,
    ingredientId: Schema.Types.ObjectId,
  });
  const ProductSchema = new Schema<IProduct>({
    name: String,
    innerName: String,
    price: Number,
    ingredients: [IngredientSchema],
  });

  return mongoose.model("Product", ProductSchema);
};
