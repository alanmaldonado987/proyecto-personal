import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany} from "typeorm";
import { Post } from "src/posts/entities/post.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid', {name: 'id_user'})
    id: string;

    @Column({ name: 'name', length: 30, type: 'varchar' })
    name: string;

    @Column({ name: 'lastname', length: 30, type: 'varchar' })
    lastname: string;

    @Column({ name: 'username', length: 30, type: 'varchar', nullable: true })
    username: string;

    @Column({ name: 'email', length: 30, type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'password', length: 30, type: 'varchar' })
    password: string;

    @OneToMany(() => Post, post => post.user, { cascade: true, eager: true, onDelete:"CASCADE" })
    posts: Post[];

    @BeforeInsert()
    convertUsername(){
        const newUsername = (this.name + " " + this.lastname).toLowerCase().replaceAll(" ", "_");
        this.username = "@"+newUsername;
    }

    @BeforeInsert()
    emailLowerCase(){
        this.email = this.email.toLowerCase();
    }
}
