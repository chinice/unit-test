import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidateBvnDTO } from './validate-bvn.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  validateBVN(@Body() param: ValidateBvnDTO) {
    return this.appService.processBVN(param);
  }
}
