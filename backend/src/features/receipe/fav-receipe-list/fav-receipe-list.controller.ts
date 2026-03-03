import { Controller, Get, Req } from "@nestjs/common";
import { FetchUserFavReceipeService } from "./fav-receipe-list.service";
import type { Request } from "express";

@Controller('fav_reciepe')
export class FetchUserFavReceipeController {
    constructor(private readonly fetchReceipe: FetchUserFavReceipeService) { }

    @Get()
    async FetchFavReceipeUsingUUID(@Req() req: Request) {
        return await this.fetchReceipe.fetchFavReceipe(req.user.uuid);
    }
}