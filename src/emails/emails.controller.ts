import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.create();
  }

  @Get()
  findAll() {
    return this.emailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailsService.remove(+id);
  }
}
