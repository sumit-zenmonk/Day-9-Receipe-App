import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateReciepeFavDto {
    @IsNotEmpty()
    recipe_uuid: string;
}