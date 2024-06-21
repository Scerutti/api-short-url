import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CartService } from '../../cart/service/cart.service';
import { toString } from '../../shared/functions';
import { UpdateUserDTO, UserBase, UserDTO } from '../interface/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly carritoService: CartService,
  ) {}

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async create(user: UserBase): Promise<UserBase> {
    const userDB = await this.findByEmail(user.email);
    if (userDB) throw new ConflictException('El usuario ya existe');

    const createdUser = await this.userModel.create(user);
    const newUser = await createdUser.save();
    const cart = await this.carritoService.createUserCart(toString(newUser._id));
    
    newUser.cartid = toString(cart._id);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec() || null;
  }

  async userUpdate(id: string, user: UpdateUserDTO): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec() || null;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new ConflictException('El usuario que se intenta eliminar no existe');
    return;
  }
}
