import { Mongoose } from "mongoose";
export default (app) => {
  const mongoose: Mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema({
    date: Date,
    productId: Schema.Types.ObjectId,
  });
  const TableSchema = new Schema({
    order: { type: Number },
    totalCustomer: { type: Number },
    totalPrice: { type: Number },
    menu: [MenuSchema],
    booker: { type: String },
    bookTime: { type: Date },
    deposit: { type: Number },
    actualPaid: { type: Number },
    status: { type: Number },
  });
  return mongoose.model("Table", TableSchema);
};
