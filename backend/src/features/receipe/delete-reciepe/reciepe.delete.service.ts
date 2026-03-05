import { Injectable } from "@nestjs/common";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";

@Injectable()
export class DeleteReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository,
        private readonly reciepeRepoStep: RecipeStepRepository,
        private readonly reciepeRepoImg: RecipeImgRepository
    ) { }

    async deleteReceipe(receipe_uuid: string, user_uuid: string) {
        // check if any active receipe exists
        const isExists = await this.reciepeRepo.findReciepeUsingUUID(receipe_uuid, user_uuid);
        if (!isExists) {
            return { message: "not found or you have no access" };
        }

        // make in_active receipe
        await this.reciepeRepo.deleteReciepe(receipe_uuid, user_uuid);
        await this.reciepeRepoStep.deleteReciepe(receipe_uuid, user_uuid);
        await this.reciepeRepoImg.deleteReciepe(receipe_uuid, user_uuid);
        return { message: "Deleted Success" };
    }

}