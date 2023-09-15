import { IsString, IsEmail, Length, IsOptional, IsNotEmpty, IsArray } from "class-validator";
import { AfterInsert } from "typeorm";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    name: string;


    @IsNotEmpty()
    @Length(1, 30)
    @IsString()
    lastname: string;


    @IsOptional()
    username?: string;


    @IsNotEmpty()
    @IsOptional()
    @Length(1, 30)
    @IsEmail()
    email: string;
    

    @IsNotEmpty()
    @Length(1, 30)
    @IsString()
    password: string;

    
    post: string[];
}
