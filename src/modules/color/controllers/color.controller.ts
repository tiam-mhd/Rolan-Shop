import { Controller, Post, Body, Get } from '@nestjs/common';
import { ColorService } from '../services/color.service';
import { CreateColorDto } from '../dtos/create-color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }
}
