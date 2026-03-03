import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";

@Injectable()
export class FetchUserFavReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository
    ) { }

    async fetchFavReceipe(user_uuid: string) {
        const user_receiepes = await this.reciepeRepo.fetchFavReceipesUsingUUID(user_uuid);
        return { message: "Fetched Success", user_receiepes: user_receiepes };
    }

}