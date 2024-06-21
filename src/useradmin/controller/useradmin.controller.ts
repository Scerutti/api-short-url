import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserAdminService } from '../service/useradmin.service';


@Controller('admin')
@ApiTags("Admin User")
export class UserAdminController {
  constructor(
    private readonly userAdminService: UserAdminService
  ) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id') id: string
  ) {
    return this.userAdminService.remove(id);
  }

}
