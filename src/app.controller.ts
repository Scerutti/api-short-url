import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  constructor() {}

  @Get()
  async helloWorld(){
    return "Hello World!";
  }
}