import { Service } from "egg";
import { Schema } from "mongoose";
const queue = new List();
/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async add(id: Schema.Types.ObjectId) {
    const { ctx } = this;
    const table = ctx.model.Table.findById(id);

    return `hi, ${name}`;
  }
}
