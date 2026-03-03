import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateReceipeService } from "./reciepe.create.service";
import { CreateReciepeDto } from "./reciepe.create.dto";
import type { Request } from "express";

@Controller('reciepe')
export class CreateReceipeController {
    constructor(private readonly createReceipe: CreateReceipeService) { }

    @Post()
    async createReceipeUsingUUID(@Body() body: CreateReciepeDto, @Req() req: Request) {
        return await this.createReceipe.createReceipe(body, req.user.uuid);
    }
}