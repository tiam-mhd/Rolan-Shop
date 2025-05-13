import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '../entities/color.entity';
import { CreateColorDto } from '../dtos/create-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepo: Repository<Color>,
  ) {}

  async create(dto: CreateColorDto): Promise<Color> {
    const color = this.colorRepo.create(dto);
    return this.colorRepo.save(color);
  }

  async findAll(): Promise<Color[]> {
    return this.colorRepo.find();
  }

  async findById(id: string): Promise<Color | null> {
  return this.colorRepo.findOne({ where: { id } });
}

}
