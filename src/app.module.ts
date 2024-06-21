import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DEB_URI!, {
      dbName: process.env.NODE_ENV === "development" ? 'develop' : 'production'
    }),
    AuthModule,
    UsuariosModule,
  ],
  controllers:[AppController],
  providers: [],
})
export class AppModule {}
