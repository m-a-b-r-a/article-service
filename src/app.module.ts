import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { User } from './user/entities/user.entity';
import { Comment } from './comment/entities/comment.entity';
import { Article } from './article/entities/article.entity';
import { Category } from './category/entities/category.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/http-error-filter';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: '',
    database: process.env.DB_NAME,
    entities:[User,Comment,Article,Category],
    synchronize: true, //membuat schema database setiap server di restart
    logging: true, //supaya perubahan data terlihat dalam log
    dropSchema: true, // menghapus schema database ketika server restart
  }), ArticleModule, CategoryModule, CommentModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },AppService],
})
export class AppModule {}
