import { Injectable } from "@nestjs/common";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";

@Injectable()
export class FetchUserReceipeService {
    constructor(
        private readonly reciepeRepo: RecipeRepository
    ) { }

    async fetchReceipe(user_uuid: string) {
        const user_receiepes = await this.reciepeRepo.fetchReceipesUsingUUID(user_uuid);
        return { message: "Fetched Success", user_receiepes: user_receiepes };
    }

}