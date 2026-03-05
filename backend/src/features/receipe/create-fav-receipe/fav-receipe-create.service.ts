import { Injectable } from "@nestjs/common";
import { UserFavoriteRepository } from "src/infrastructure/repository/user.fav.repo";

@Injectable()
export class CreateUserFavReceipeService {
    constructor(
        private readonly reciepefavRepo: UserFavoriteRepository
    ) { }

    async CreateFavReceipe(recipe_uuid: string, user_uuid: string) {
        const isExists = await this.reciepefavRepo.fetchUsingRecipeUUID(recipe_uuid, user_uuid);

        if (isExists) {
            await this.reciepefavRepo.ChangeStatusFavReceipesUsingUUID(recipe_uuid, user_uuid);
            return { message: "Already Exists Status Success", user_receiepes: isExists };
        }

        const user_receiepes = await this.reciepefavRepo.createFavReceipesUsingUUID(recipe_uuid, user_uuid);
        return { message: "Createed Success", user_receiepes: user_receiepes };
    }

}