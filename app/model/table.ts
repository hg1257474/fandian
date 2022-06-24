import { Mongoose } from "mongoose";
export default (app) => {
  const mongoose: Mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const Menu = {};
  const TableSchema = new Schema({
    order: { type: Number },
    totalCustomer: { type: Number },
    totalPrice: { type: Number },
    menu: { type: Menu },
    booker: { type: String },
    bookTime: { type: Date },
    deposit: { type: Number },
    actualPaid: { type: Number },
    status: { type: Number },
  });

  return mongoose.model("Table", TableSchema);
};

// {app_root}/app/controller/user.js
export function* index(ctx) {
  ctx.body = yield ctx.model.User.find({});
}
