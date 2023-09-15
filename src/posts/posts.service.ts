import { FindUserDto } from 'src/users/dto/find-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>,
              @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async create(createPostDto: CreatePostDto) {

    const { user, ...restPost } = createPostDto;
    
    const queryBuilder = await this.postRepository.createQueryBuilder('post');
    const findUser = await queryBuilder.innerJoinAndSelect('post.user', 'user').getOne();
    
    const newPost = await this.postRepository.create({
      ...restPost,
      user: findUser.user
    });
    
    await this.postRepository.save(newPost);

    return newPost;
  }

  async delete(id: string){
    try{
      const deletePost = await this.postRepository.findOne({where: {id: id}})

      if(!deletePost) throw new NotFoundException('El post no fué encontrado...')

      await this.postRepository.remove(deletePost);
      
      return 'Se eliminó con exito!';
    }catch(error){
      throw error;
    }
  }
}
