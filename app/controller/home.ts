import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.app
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
