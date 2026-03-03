import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateReciepeDto {
    @IsNotEmpty()
    @IsString()
    recipe_name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayNotEmpty()
    steps_string: string[];

    @IsString()
    @IsNotEmpty()
    img: string;
}