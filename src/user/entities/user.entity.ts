import { Article } from "src/article/entities/article.entity"
import { Comment } from "src/comment/entities/comment.entity"
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name:string
    @Column()
    email:string
    @Column()
    password:string
    @Column({name:"profile_picture",type:'text'})
    profilePicture:string
    @CreateDateColumn({
        name:"created_at",
        type:"timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt:Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        default : () => "CURRENT_TIMESTAMP(6)"
    })
    updatedAt:Date;

    @OneToMany(() => Comment,
    (comment : Comment ) => comment.user,
    { onDelete: 'CASCADE' }
    )
    comments: Array<Comment>

    @OneToMany(() => Article,(article:Article) => article.user)
    articles: Array<Article>
}
