import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserAdminController } from './controller/useradmin.controller';
import { UserAdmin, UserAdminSchema } from './model/useradmin.model';
import { UserAdminService } from './service/useradmin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserAdmin.name, schema: UserAdminSchema},
    ])
  ],
  providers: [UserAdminService],
  controllers: [UserAdminController],
  exports: [UserAdminService]
})
export class UserAdminModule {}
