import { EggApplication } from 'egg';
import egg from 'egg-mongoose';
//class TableSchema implements Application,

interface Oj{
e
}
const Var:Oj;
export default (app:EggApp) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  EggApplication
  const Menu={
    
  }
  const TableSchema = new Schema({
      order:{type:Number},
      totalCustomer:{type:Number},
      totalPrice:{type:Number},
      menu:{type:Var},
      booker:{type:String},
      bookTime:{type:Date},
      deposit:{type:Number},
      actualPaid:{type:Number},
      status:{type:Number}
    }

  });

  return mongoose.model("User", UserSchema);
};

// {app_root}/app/controller/user.js
export function* index(ctx) {
  ctx.body = yield ctx.model.User.find({});
}
