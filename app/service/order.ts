import { Service } from "egg";
import TableSchema, { IMenu, ITable } from "../model/table";
import { Schema, Query } from "mongoose";
import internal = require("assert");
import { IProduct } from "../model/product";
interface LinkListNode {
  last: LinkListNode|null;
  item: {
    time:Date
    table:Number
    tableId:Schema.Types.ObjectId
    name:string
    innerName:string
    status:Number
  };
  next: LinkListNode|null;
}
let firstNode: LinkListNode;
let lastNode: LinkListNode;
const productMap:{
  [index:string]:LinkListNode[];
};

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async add(tableNumber:Number,tableId:Schema.Types.ObjectId,menu:IMenu[]) {
    const { ctx } = this;
    menu.forEach((item,index)=>{
      const product:IProduct=await ctx.model.Product.findById(item.productId).exec();
      const node:LinkListNode={
        last:null,
        item:{
          time:item.schedule,
          tableId:tableId,
          table:tableNumber,
          name:product.name,
          innerName:product.innerName,
          status:item.status,

        },
        next:null

      }
      if(productMap[product.name]){
        
        productMap[product.name].splice()
      }
    })
    const table:ITable = await ctx.model.Table.findById(id).exec();
    if()
    //const menu = table.menu;
    return `hi, ${name}`;
  }
}
