import { Mongoose, Schema } from "mongoose";
export interface IMenu {
  schedule: Date;
  status: Number;
  productId: Schema.Types.ObjectId;
}
export interface ITable {
  number: Number;
  totalCustomer: Number;
  totalPrice: Number;
  menu: {
    [index: string]: IMenu;
  };
  booker: String;
  bookTime: Date;
  deposit: Number;
  actualPaid: Number;
  status: Number;
}
export default (app) => {
  const mongoose: Mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema<IMenu>({
    schedule: { type: Date },
    status: { type: Number },
    productId: { type: Schema.Types.ObjectId },
  });
  const TableSchema = new Schema<ITable>({
    number: { type: Number },
    totalCustomer: { type: Number },
    totalPrice: { type: Number },
    menu: {
      type: Map,
      of: MenuSchema,
    },
    booker: { type: String },
    bookTime: { type: Date },
    deposit: { type: Number },
    actualPaid: { type: Number },
    status: { type: Number },
  });
  return mongoose.model<ITable>("Table", TableSchema);
};
