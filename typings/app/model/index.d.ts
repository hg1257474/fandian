// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import "egg";
import ExportProduct from "../../../app/model/product";
import ExportTable from "../../../app/model/table";

declare module "egg" {
  interface IModel {
    Product: ReturnType<typeof ExportProduct>;
    Table: ReturnType<typeof ExportTable>;
  }
}
