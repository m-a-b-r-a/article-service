import { Article } from "src/article/entities/article.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn({
        name:"created_at",
        type:"timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt:Date
    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        default : () => "CURRENT_TIMESTAMP(6)"
    })
    updatedAt:Date

    @OneToMany(() => Article,(article:Article) => article.category)
    articles:Array<Article>
}
