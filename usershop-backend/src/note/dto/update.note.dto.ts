import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateNoteDTO{
    @IsString()
    @IsOptional()
    title?:string

    @IsString()
    @IsOptional()
    description?:string

    @IsString()
    @IsOptional()
    url?:string

    constructor(
        title?:string,
        url?:string,
        description?:string
    ){
        this.title = title;
        this.url = url;
        this.description = description;
    }
}