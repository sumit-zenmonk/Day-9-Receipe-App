import { Module } from "@nestjs/common";
import { CreateReceipeController } from "./reciepe.create.controller";
import { CreateReceipeService } from "./reciepe.create.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";

@Module({
    imports: [],
    controllers: [CreateReceipeController],
    providers: [CreateReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
    exports: [],
})

export class CreateReceipeModule { }