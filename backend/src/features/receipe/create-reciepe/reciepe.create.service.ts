import { Injectable } from "@nestjs/common";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { CreateReciepeDto } from "./reciepe.create.dto";

@Injectable()
export class CreateReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository,
        private readonly reciepeRepoStep: RecipeStepRepository,
        private readonly reciepeRepoImg: RecipeImgRepository
    ) { }

    async createReceipe(body: CreateReciepeDto, user_uuid: string) {
        // check if any active receipe exists
        const isExists = await this.reciepeRepo.findReciepeUsingRecipeName(body.recipe_name);
        if (isExists) {
            return { message: "Exists With this name earlier" };
        }

        // receipe created
        const newRecipe = await this.reciepeRepo.createReciepe(body, user_uuid);
        //steps included
        for (const elem of body.steps_string) {
            await this.reciepeRepoStep.createReciepeStep(elem, newRecipe.recipe_uuid);
        }
        //imge included
        await this.reciepeRepoImg.createReciepeImg(body.img, newRecipe.recipe_uuid);

        return { message: "Added Success" };
    }

}