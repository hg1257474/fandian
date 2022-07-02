// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportProduct from '../../../app/controller/product';
import ExportStock from '../../../app/controller/stock';
import ExportTable from '../../../app/controller/table';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    product: ExportProduct;
    stock: ExportStock;
    table: ExportTable;
  }
}
