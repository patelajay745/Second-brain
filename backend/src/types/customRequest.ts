import { IUser } from "./user";
import { Request } from "express";

export interface CustomRequest extends Request {
  user?: IUser;
}
