import { Module } from "@nestjs/common";
import { DeleteReceipeService } from "./reciepe.delete.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";
import { RecipeStepRepository } from "src/infrastructure/repository/reciepe.steps.repo";
import { RecipeImgRepository } from "src/infrastructure/repository/reciepe.img.repo";
import { DeleteReceipeController } from "./reciepe.delete.controller";

@Module({
    imports: [],
    controllers: [DeleteReceipeController],
    providers: [DeleteReceipeService, RecipeRepository, RecipeStepRepository, RecipeImgRepository],
    exports: [],
})

export class DeleteReceipeModule { }