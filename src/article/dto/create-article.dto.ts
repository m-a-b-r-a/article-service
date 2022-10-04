import {IsNotEmpty} from 'class-validator';
export class CreateArticleDto {

    @IsNotEmpty()
    title: string
    
    @IsNotEmpty()
    description: string
    summary: string
    
    category_id: number
    created_by:number
}
