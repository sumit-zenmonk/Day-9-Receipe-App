import { Controller, Get, Param } from "@nestjs/common";
import { SearchReceipeService } from "./reciepe.search.service";

@Controller('search_reciepe')
export class SearchReceipeController {
    constructor(private readonly searchReceipe: SearchReceipeService) { }

    @Get(':receipe_name')
    async SearchReceipeUsingName(@Param() params: any) {
        return await this.searchReceipe.SearchReceipeUsingName(params.receipe_name);
    }

    @Get('id/:receipe_uuid')
    async searchByUUID(@Param('receipe_uuid') uuid: string) {
        return await this.searchReceipe.SearchReceipeUsingUUID(uuid);
    }
}