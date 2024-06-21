import { Document } from "mongoose";

export interface CartBase extends Document{
  userid: string;
  totalPrice: number;
  products: any[];
}

export interface CartDTO extends Omit<CartBase, keyof CartBase>{};
