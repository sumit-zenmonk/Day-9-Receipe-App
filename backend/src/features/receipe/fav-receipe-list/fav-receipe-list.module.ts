import { Module } from "@nestjs/common";
import { FetchUserFavReceipeController } from "./fav-receipe-list.controller";
import { FetchUserFavReceipeService } from "./fav-receipe-list.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";

@Module({
    imports: [],
    controllers: [FetchUserFavReceipeController],
    providers: [FetchUserFavReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
    exports: [],
})

export class FetchUserFavReceipeModule { }