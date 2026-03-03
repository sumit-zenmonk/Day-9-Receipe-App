import { Controller, Get } from "@nestjs/common";
import { FetchAllReceipeService } from "./reciepe.fetch.all.service";

@Controller('all_reciepe')
export class FetchAllReceipeController {
    constructor(private readonly fetchReceipe: FetchAllReceipeService) { }

    @Get()
    async FetchReceipeUsingUUID() {
        return await this.fetchReceipe.fetchReceipe();
    }
}