import { Mongoose } from "mongoose";
export default (app) => {
  const mongoose: Mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const IngredientSchema = new Schema({
    weight: Number,
    ingredientId: Schema.Types.ObjectId,
  });
  const ProductSchema = new Schema({
    name: String,
    innerName: String,
    price: Number,
    ingredients: [IngredientSchema],
  });

  return mongoose.model("Product", ProductSchema);
};
