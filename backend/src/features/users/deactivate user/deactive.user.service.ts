import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";

@Injectable()
export class DeactivateUserService {
    constructor(private readonly UserRepo: UserRepository) { }

    async deactivateUserUsingUUID(uuid: string) {
        // find user if it exists
        const isExists = await this.UserRepo.findByUuid(uuid);
        if (!isExists.length) {
            return {
                message: "User not exists"
            }
        }

        // deactivate user
        await this.UserRepo.deactivateUserUsingUUID(uuid);
        return {
            message: "User deactivated success"
        }
    }
}