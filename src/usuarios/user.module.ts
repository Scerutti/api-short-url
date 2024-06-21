import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartModule } from '../cart/cart.module';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './models/user.model';
import { UsuariosService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
    ]),
    CartModule
  ],
  providers: [UsuariosService],
  controllers: [UserController],
  exports: [UsuariosService]
})
export class UsuariosModule {}
