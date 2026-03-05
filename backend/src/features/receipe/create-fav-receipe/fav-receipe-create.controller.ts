import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserFavReceipeService } from "./fav-receipe-create.service";
import type { Request } from "express";
import { CreateReciepeFavDto } from "./fav-receipe-create.dto";

@Controller('fav_reciepe')
export class CreateUserFavReceipeController {
    constructor(private readonly createReceipe: CreateUserFavReceipeService) { }

    @Post()
    async CreateFavReceipeUsingUUID(@Body() body: CreateReciepeFavDto, @Req() req: Request) {
        return await this.createReceipe.CreateFavReceipe(body.recipe_uuid, req.user.uuid);
    }
}