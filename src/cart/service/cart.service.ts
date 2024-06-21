import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { parseNumber } from "../../shared/functions";
import { CartBase, CartDTO } from "../interface/cart.interface";
import { Cart } from "../model/cart.model";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly carritoModel: Model<Cart>,
  ){}
  async createUserCart(userid: string): Promise<CartBase> {
    const newCart: CartDTO = {
      userid: userid,
      products: [],
      totalPrice: 0
    }
    const newCarrito = new this.carritoModel(newCart);
    return newCarrito.save();
  }

  async getCarritoById(cartId: string): Promise<CartBase> {
    const cart = await this.carritoModel.findById(cartId);
    if (!cart) {
      throw new ConflictException(`Carrito con id ${cartId} no fue encontrado`);
    }
    return cart;
  }

  async updateCarritoProductos(cartid: string, body: any, operation: string = "addition"): Promise<void> {
    const cart = await this.carritoModel.findById(cartid);
    if (!cart) {
      throw new ConflictException(`Carrito con id ${cartid} no fue encontrado`);
    }
    switch (operation){
      case "addition":
        this.addProductToCart(cart, body);
        break;
      case "deletion":
        this.deleteProductFromCart(cart, body);
        break;
      default:
        throw new ConflictException(`Operacion ${operation} no valida`);
    }
    await this.carritoModel.updateOne(
      { _id: cart._id },
      { $set: { products: cart.products, totalPrice: cart.totalPrice } }
    )
  }

  private async addProductToCart(carrito: Cart, products: any) : Promise<void> {
    const existingProduct = carrito.products.find( p => p._id === products._id);
    if (existingProduct) {
      existingProduct.quantity += products.quantity
    } else {
      carrito.products.push(products);
    }
    this.updateTotalPrice(carrito, parseNumber(products.price) * products.quantity, false);
  }

  async deleteProductFromCart(carrito: Cart, productId: any): Promise<void> {
    const existingProduct = carrito.products.find( p => p._id === productId._id);
    if (existingProduct) {
      carrito.products = carrito.products.filter( p => p._id !== productId._id);
    }
    this.updateTotalPrice(carrito, parseNumber(productId.price) * productId.quantity, true);
  }

  async clearCart(cartId: string): Promise<CartBase> {
    const cart = await this.carritoModel.findById(cartId).exec();
    if (!cart) {
      throw new ConflictException("Error al intentar vaciar el carrito");
    }
    cart.products = [];
    cart.totalPrice = 0;
    return cart.save();
  }

  async deleteCart(id: string): Promise<void>{
    await this.carritoModel.deleteOne({ _id: id });
  }

  private updateTotalPrice(cart: CartBase, amount: number, isDeletion: boolean = false) {
    if (isDeletion) {
      cart.totalPrice -= amount;
      if (cart.totalPrice < 0) {
        cart.totalPrice = 0;
      }
    } else {
      cart.totalPrice += amount;
    }
    cart.totalPrice = parseFloat(cart.totalPrice.toFixed(2));
  }
}