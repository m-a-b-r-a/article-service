import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilterArticleDto } from './dto/filter-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()


export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>){}

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepo.create(createArticleDto);
    await  this.articleRepo.save(newArticle);
    return newArticle;
  }

  async getArticles() {
    return await this.articleRepo.find();
  }

  async getArticleFilter(filterArticleDto:FilterArticleDto){
    const {search} = filterArticleDto;
    if(search){
     return await this.articleRepo.find({
      where: [
        {title:Like(`%${search}%`)},
        {description:Like(`%${search}%`)}
      ]
     })
    }
  }
  async getArticle(id) {
    return await this.articleRepo.findOne({
      where:{id}
  });
  }

  async update(id: number, updateArticleDto: Partial<UpdateArticleDto>) {
    await this.articleRepo.update({id},updateArticleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
