import { Category } from "src/category/entities/category.entity"
import { Comment } from "src/comment/entities/comment.entity"
import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    title: string

    @Column('text')
    description:string

    @Column('text')
    summary:string

    @Column({
        name:"image_cover", 
        default:"https://www.sportanddev.org/sites/default/files/styles/borealis_spor_16_9_cropped_default_style_respondmedium/public/default_images/default-organization-cover_1.png?itok=Xcc_WIdO"
    
    })
    imageCover:string

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

    @OneToMany(() => Comment,(comment: Comment) => comment.article,{ onDelete: 'CASCADE' })
    comments:Array<Comment>

    @ManyToOne(() => User,(user:User) => user.articles)
    @JoinColumn({
        name:'created_by'
    })
    user:User
    @ManyToOne(() => Category,(category:Category) => category.articles)
    @JoinColumn({
        name:'category_id'
    })
    category:Category
}
