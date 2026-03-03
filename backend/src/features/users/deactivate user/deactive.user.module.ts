import { Module } from "@nestjs/common";
import { DeactivateUserService } from "./deactive.user.service";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { DeactivateUserController } from "./deactive.user.controller";

@Module({
    imports: [],
    controllers: [DeactivateUserController],
    providers: [DeactivateUserService, UserRepository],
    exports: [],
})

export class DeactivateUserModule { }