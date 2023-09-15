import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsModule } from '../posts/posts.module';
import { Post } from 'src/posts/entities/post.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User, Post]),
  PostsModule,
],
  controllers: [UsersController],
  providers: [ UsersService ],
  exports: [TypeOrmModule]
})
export class UsersModule {}
