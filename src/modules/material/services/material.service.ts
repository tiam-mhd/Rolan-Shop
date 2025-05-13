import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { CreateMaterialDto } from '../dtos/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepo: Repository<Material>,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepo.create(dto);
    return this.materialRepo.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepo.find();
  }
  
  async findById(id: string): Promise<Material | null> {
  return this.materialRepo.findOne({ where: { id } });
}

}
