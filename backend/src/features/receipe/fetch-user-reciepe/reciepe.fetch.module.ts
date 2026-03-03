import { Module } from "@nestjs/common";
import { FetchUserReceipeController } from "./reciepe.fetch.controller";
import { FetchUserReceipeService } from "./reciepe.fetch.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";

@Module({
    imports: [],
    controllers: [FetchUserReceipeController],
    providers: [FetchUserReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
    exports: [],
})

export class FetchUserReceipeModule { }