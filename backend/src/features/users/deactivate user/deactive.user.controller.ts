import { Controller, Get, Param, Req } from "@nestjs/common";
import { DeactivateUserService } from "./deactive.user.service";

@Controller('/deactivate/user')
export class DeactivateUserController {
    constructor(private readonly deactivateUser: DeactivateUserService) { }

    @Get(':id')
    async deactivateUserUsingUUID(@Param() params: any) {
        return await this.deactivateUser.deactivateUserUsingUUID(params.id);
    }
}