import { Controller } from "egg";
export default class HomeController extends Controller {
  public async add() {
    const { ctx } = this;
    const table = new ctx.model.Table(ctx.body);
    await table.save();
    ctx.body = 1;
  }
  public async del() {
    const { ctx } = this;
    ctx.model.Table.findByIdAndRemove(ctx.body.tableId);
  }
}
