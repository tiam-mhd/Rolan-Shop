import { Controller, Post, Body, Get } from '@nestjs/common';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() dto: CreateMaterialDto) {
    return this.materialService.create(dto);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }
}
