import { Controller, Get, Post, Body, Patch, Param, Delete , Query , ParseIntPipe } from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilterArticleDto } from './dto/filter-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  getArticles(@Query() filterArticleDto:FilterArticleDto) {

    if(Object.keys(filterArticleDto).length > 0){
      return this.articleService.getArticleFilter(filterArticleDto);
    }
    return this.articleService.getArticles();
  }

  @Get(':id')
  getArticle(@Param('id',ParseIntPipe) id: number) {
    return this.articleService.getArticle(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
