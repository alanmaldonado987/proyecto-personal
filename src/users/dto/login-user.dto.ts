import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @Length(1, 30)
    @IsString()
    username: string;


    @IsNotEmpty()
    @Length(1, 30)
    @IsEmail()
    email: string;
    

    @IsNotEmpty()
    @Length(1, 30)
    @IsString()
    password: string;
}
