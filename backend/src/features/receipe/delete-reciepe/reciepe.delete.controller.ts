import { Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { DeleteReceipeService } from "./reciepe.delete.service";
import type { Request } from "express";

@Controller('reciepe')
export class DeleteReceipeController {
    constructor(private readonly deleteReceipe: DeleteReceipeService) { }

    @Delete(':uuid')
    async DeleteReceipeUsingUUID(@Param() params: any, @Req() req: Request) {
        return await this.deleteReceipe.deleteReceipe(params.uuid, req.user.uuid);
    }
}