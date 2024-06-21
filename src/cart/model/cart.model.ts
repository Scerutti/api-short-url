import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Cart extends Document {
  @Prop()
  userid!: string;

  @Prop()
  totalPrice!: number;

  @Prop({default: []})
  products!: any[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);