import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    id : number
    
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
    
    summary: string
    category_id: number
}
