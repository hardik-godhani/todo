import { BaseModel } from "./baseModel";

export class Note extends BaseModel {
  id: number;
  title: String;
  description: String;
  isCompleted: boolean = false;
}
