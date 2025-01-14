import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CartController } from "./controller/cart.controller";
import { Cart, CartSchema } from "./model/cart.model";
import { CartService } from "./service/cart.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema }
    ])
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {};