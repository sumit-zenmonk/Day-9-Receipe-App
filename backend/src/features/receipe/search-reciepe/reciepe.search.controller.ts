import { Controller, Get, Param } from "@nestjs/common";
import { SearchReceipeService } from "./reciepe.search.service";

@Controller('search_reciepe')
export class SearchReceipeController {
    constructor(private readonly SearchReceipe: SearchReceipeService) { }

    @Get(':receipe')
    async SearchReceipeUsingName(@Param() params: any) {
        return await this.SearchReceipe.SearchReceipeUsingName(params.receipe);
    }
}