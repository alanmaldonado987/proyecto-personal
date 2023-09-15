import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { PaginationDto } from '../common/pagination.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const {
      post = ['Bienvenido a esta nueva red social! Disfrutalo!'],
      ...restUserDto
    } = createUserDto;

    const findUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (findUser)
      throw new NotFoundException(
        'El usuario con ese correo ya está registrado',
      );

    const newUser: User = await this.userRepository.create({
      ...restUserDto,
      posts: post.map((post) =>
        this.postRepository.create({ post_content: post }),
      ),
    });

    await this.userRepository.save(newUser);

    return { ...newUser, post };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
        password: loginUserDto.password,
        username: loginUserDto.username,
      },
    });

    if (!findUser) throw new NotFoundException('Credenciales Incorrectas!!');

    return findUser;
  }

  findAll(query: PaginationDto) {
    const { limit = 10, skip = 1 } = query;

    console.log(skip, limit);

    return this.userRepository.find({
      skip: Number(skip),
      take: Number(limit),
      relations: {
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    if (isUUID(id)) {
      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) throw new NotFoundException('No se encontró el usuario...');

      if (user.username === null) {
        const { name, lastname, password, email } = user;
        return { name, lastname, password, email };
      }

      return user;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    this.userRepository.delete(id);
    return `El usuario con el id: ${id} a sido removido`;
  }
}
