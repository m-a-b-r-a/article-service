import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/shared/http-error-filter';
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
    const data =  await this.categoryRepo.findOne({
      where:{id}
    })
    if(!data){
      throw new NotFoundException(`Category ${id} not found`)
    }

    return data;
  }

  async update(id: number, updateCategoryDto: Partial<UpdateCategoryDto>) {
    await this.categoryRepo.update({id},updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result  = await this.categoryRepo.delete({id});
    if(result.affected === 0){
      throw new NotFoundException(`Category ${id} not found`)
    }
    return {deleted:true};
  }
}
