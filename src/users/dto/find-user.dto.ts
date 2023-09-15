import { IsString, IsEmail, Length, IsNotEmpty, IsUUID } from "class-validator";

export class FindUserDto {
    @IsUUID()
    @Length(1, 70)
    @IsString()
    id: string;

    @Length(1, 70)
    @IsString()
    post_content: string;

}
