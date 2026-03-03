import { Module } from "@nestjs/common";
import { FetchAllReceipeController } from "./reciepe.fetch.all.controller";
import { FetchAllReceipeService } from "./reciepe.fetch.all.service";
import { RecipeRepository } from "src/infrastructure/repository/reciepe.repo";

@Module({
    imports: [],
    controllers: [FetchAllReceipeController],
    providers: [FetchAllReceipeService, RecipeRepository],
    exports: [],
})

export class FetchAllReceipeModule { }