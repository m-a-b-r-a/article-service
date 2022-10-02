import { userInfo } from "os";
import { Article } from "src/article/entities/article.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column('text')
    description:string
    
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

    @ManyToOne(() => Article,(article : Article) => article.comments)

    @JoinColumn({name:"article_id"}) 
    article:Article

    @ManyToOne(()=>User,(user:User) => user.comments)

    @JoinColumn({name:"user_id"})
    user:User
}   
