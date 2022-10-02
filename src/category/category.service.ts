import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()

export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo:Repository<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(newCategory);
    return newCategory;

  }

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    return  await this.categoryRepo.find({
      where:{id}
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
