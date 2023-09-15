import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    post_content: string;

    file?: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    user: string;
}
