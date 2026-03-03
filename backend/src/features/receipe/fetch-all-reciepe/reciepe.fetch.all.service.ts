import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";

@Injectable()
export class FetchAllReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository
    ) { }

    async fetchReceipe() {
        const receiepes = await this.reciepeRepo.fetchAllReceipes();
        return { message: "Fetched All Success", receiepes: receiepes };
    }

}