import { Module } from "@nestjs/common";
import { CreateUserFavReceipeController } from "./fav-receipe-create.controller";
import { CreateUserFavReceipeService } from "./fav-receipe-create.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { UserFavoriteRepository } from "src/infrastructure/repository/user.fav.repo";

@Module({
    imports: [],
    controllers: [CreateUserFavReceipeController],
    providers: [CreateUserFavReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository, UserFavoriteRepository],
    exports: [],
})

export class CreateUserFavReceipeModule { }