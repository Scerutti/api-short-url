import { Body, ConflictException, Controller, Delete,Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { HttpResponse } from '../../shared/httpresponse';
import { CreateUserDTO, UpdateUserDTO, UserBase, UserDTO } from '../interface/user.interface';
import { UsuariosService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return await this.usuariosService.getUsers();
  }

  @Post()
  async createUser(
    @Body() userDTO: CreateUserDTO
  ): Promise<HttpResponse<UserBase>> {
    return this.usuariosService.create(userDTO)
    .then((user) => ({
        httpStatus: HttpStatus.CREATED,
        data: user
      }))
    .catch((error) => {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Post('email')
  async findByEmail(
    @Body() body: { email: string }
  ): Promise<HttpResponse<UserBase>> {
    const user = await this.usuariosService.findByEmail(body.email);
    if (!user) {
      return { message: 'Usuario no encontrado', httpStatus: HttpStatus.NOT_FOUND}
    }
    return {data: user, httpStatus: HttpStatus.OK};
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() user: UpdateUserDTO
  ): Promise<HttpResponse<UserBase | null>>{
    try {
      const updateUser = await this.usuariosService.userUpdate(id, user);
      return { data: updateUser, httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteUser(
    @Param("id") id: string
  ): Promise<HttpResponse<null>> {
    try {
      await this.usuariosService.delete(id);
      return { message: 'Usuario eliminado satisfactoriamente.', httpStatus: HttpStatus.OK };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
