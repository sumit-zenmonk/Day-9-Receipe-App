import { Injectable } from "@nestjs/common";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";

@Injectable()
export class SearchReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository
    ) { }

    async SearchReceipeUsingName(receipe_name: string) {
        // check if any active receipe exists
        const isExists = await this.reciepeRepo.searchReceiepeUsingName(receipe_name);
        if (!isExists) {
            return { message: "Not Found" };
        }

        return { message: "Searchd Success", data: isExists };
    }

    async SearchReceipeUsingUUID(receipe_uuid: string) {
        // check if any active receipe exists
        const isExists = await this.reciepeRepo.searchReceiepeUsingUUID(receipe_uuid);
        if (!isExists) {
            return { message: "Not Found" };
        }

        return { message: "Searchd Success", data: isExists };
    }

}