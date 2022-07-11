import { Service } from "egg";
import TableSchema, { IMenu, ITable } from "../model/table";
import { Schema, Query } from "mongoose";
import internal = require("assert");
import { IProduct } from "../model/product";
interface LinkListNode {
  last: LinkListNode | null;
  item: {
    time: String;
    schedule: Date;
    table: Number;
    tableId: Schema.Types.ObjectId;
    name: string;
    innerName: string;
    status: Number;
  };
  next: LinkListNode | null;
}
let firstNode: LinkListNode;
let lastNode: LinkListNode;
const productMap: {
  [index: string]: LinkListNode[];
} = {};

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async add(
    tableNumber: Number,
    tableId: Schema.Types.ObjectId,
    menu: {
      [index: string]: IMenu;
    }
  ) {
    const { ctx } = this;
    const entries = Object.entries(menu);
    for (let i = 0; i < entries.length; i++) {
      const product: IProduct = await ctx.model.Product.findById(
        entries[i][1].productId
      ).exec();
      const node: LinkListNode = {
        last: null,
        item: {
          time: entries[i][0],
          schedule: entries[i][1].schedule,
          tableId: tableId,
          table: tableNumber,
          name: product.name,
          innerName: product.innerName,
          status: entries[1][1].status,
        },
        next: null,
      };
      if (productMap[product.innerName])
        if (!entries[i][1].schedule) productMap[product.innerName].push(node);
        else
          productMap[product.innerName].splice(
            productMap[product.innerName].findIndex(
              (sItem) => !!sItem.item.status
            ) || productMap[product.innerName].length,
            0,
            node
          );
      else productMap[product.innerName] = [node];
      if (!firstNode) {
        firstNode = node;
        lastNode = node;
      } else {
        let current: LinkListNode | null;
        if (node.item.schedule) {
          current = lastNode;
          while (current && current.item.schedule > node.item.schedule)
            current = current.last;
          if (!current) {
            node.next = firstNode;
            firstNode.last = node;
            firstNode = node;
          } else {
            node.last = current.last;
            node.next = current;
            current.last = current;
          }
        } else {
          current = firstNode;
          while (current && current.item.status) current = current.next;
          if (!current) {
            node.last = lastNode;
            lastNode.next = node;
            lastNode = node;
          } else {
            node.last = current.last;
            node.next = current;
            current.last = current;
          }
        }
      }
    }
    return `hi, ${name}`;
  }
  public async del(
    tableId: Schema.Types.ObjectId,
    menu: {
      [index: string]: IMenu;
    }
  ) {
    const { ctx } = this;

    const entries = Object.entries(menu);
    for (let i = 0; i < entries.length; i++) {
      const product = await ctx.model.product.findById(entries[i][1].productId);
      let node;
      if (productMap[product.innerName].length == 1) {
        node = productMap[product.innerName][0];
        delete productMap[product.innerName];
      } else {
        const itemIndex = productMap[product.innerName].findIndex(
          (item) =>
            item.item.tableId == tableId && item.item.time == entries[i][0]
        );
        node = productMap[product.innerName][itemIndex];
        productMap[product.innerName].splice(itemIndex, 1);
      }
      node.last.next = node.next;
      node.next.last = node.last;
    }
  }
  public async update(
    tableId: Schema.Types.ObjectId,
    tableNumber: number,
    menu: {
      [index: string]: IMenu;
    }
  ) {
    const { ctx } = this;
    const entries = Object.entries(menu);
    for (let i = 0; i < entries.length; i++) {
      const product = await ctx.model.product.findById(entries[i][1].productId);
      const node = productMap[product.innerName].find(
        (item) =>
          item.item.tableId == tableId && item.item.time == entries[i][0]
      );
      if (!node) throw Error("impossible");
      node.item = {
        time: entries[i][0],
        schedule: entries[i][1].schedule,
        tableId: tableId,
        table: tableNumber,
        name: product.name,
        innerName: product.innerName,
        status: entries[1][1].status,
      };
    }
  }
}
