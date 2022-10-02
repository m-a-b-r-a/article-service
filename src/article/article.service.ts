import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()


export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>){}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async getArticles() {
    return await this.articleRepo.find();
  }

  async getFilteredArticles(){

  }

  async getArticle(id) {
    return await this.articleRepo.findOne(id);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
