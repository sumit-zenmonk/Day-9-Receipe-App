import { Module } from "@nestjs/common";
import { SearchReceipeService } from "./reciepe.search.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { SearchReceipeController } from "./reciepe.search.controller";

@Module({
    imports: [],
    controllers: [SearchReceipeController],
    providers: [SearchReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
    exports: [],
})

export class SearchReceipeModule { }