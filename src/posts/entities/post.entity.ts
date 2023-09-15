import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid', {name: 'id_posts'})
    id: string;

    @Column({ name: 'post_content', length: 700, type: 'varchar' })
    post_content: string;

    @Column({ name: 'file', nullable: true })
    file?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.posts)
     user: User;
}
