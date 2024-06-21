import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put, Query } from "@nestjs/common";

import { HttpResponse } from "../../shared/httpresponse";
import { CartBase } from "../interface/cart.interface";
import { CartService } from "../service/cart.service";

@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) {}

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ): Promise<HttpResponse<CartBase>>{
    try {
      const cart = await this.cartService.getCarritoById(id);
      return { data: cart, httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  @Put(":id")
  async updateCart(
    @Param("id") id: string,
    @Body() products: any,
    @Query('operation') operation?: string,
  ): Promise<HttpResponse<null>>{
    try {
      await this.cartService.updateCarritoProductos(id, products, operation);
      return { message: 'Carrito actualizado satisfactoriamente.', httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteCart(
    @Param("id") id: string
  ): Promise<HttpResponse<null>>{
    try {
      await this.cartService.deleteCart(id);
      return { message: 'Carrito eliminado satisfactoriamente.', httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/clear/:cartid")
  async clearCart(
    @Param("cartid") cartid: string
  ): Promise<HttpResponse<CartBase>>{
    try {
      const cart = await this.cartService.clearCart(cartid);
      return { data: cart, httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}