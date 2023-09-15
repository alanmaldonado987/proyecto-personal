import { IsOptional } from "class-validator";

export class PaginationDto{

    @IsOptional()
    skip?: number;

    @IsOptional()
    limit?: number;
    
}