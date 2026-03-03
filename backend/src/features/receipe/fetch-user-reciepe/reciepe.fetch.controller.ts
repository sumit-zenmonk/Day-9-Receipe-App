import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { FetchUserReceipeService } from "./reciepe.fetch.service";
import type { Request } from "express";

@Controller('reciepe')
export class FetchUserReceipeController {
    constructor(private readonly fetchReceipe: FetchUserReceipeService) { }

    @Get()
    async FetchReceipeUsingUUID(@Req() req: Request) {
        return await this.fetchReceipe.fetchReceipe(req.user.uuid);
    }
}