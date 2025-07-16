import { Repository, TreeRepository } from "typeorm";
import { Category } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: TreeRepository<Category>,
  ) { }

  findById(id: string) {
    return this.categoryRepo.findOne({ where: { id } });
  }

  async create(dto: CreateCategoryDto) {
    const category = new Category();
    category.title = dto.title;

    if (dto.parentId) {
      const parent = await this.categoryRepo.findOne({ where: { id: dto.parentId } });
      if (!parent) throw new NotFoundException('Parent category not found');
      category.parent = parent;
    }

    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.categoryRepo.update(id, dto);
    return this.categoryRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    await this.categoryRepo.remove(category);
    return { message: 'Category deleted successfully' };
  }


  async getTree() {
    return this.categoryRepo.findTrees(); // می‌تونه کل ساختار درختی رو بده
  }

}
