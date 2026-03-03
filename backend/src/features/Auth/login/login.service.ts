import { UserRepository } from "src/infrastructure/repository/user.repo";
import { LoginDto } from "./login.dto";
import { AuthService } from "src/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";

@Injectable()
export class LoginService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly authService: AuthService,
        private readonly bcryptService: BcryptService
    ) { }

    async loginUser(body: LoginDto) {
        //check if already exists using this email
        const isUserEmailExists = await this.userRepo.findByEmail(body.email);
        if (!isUserEmailExists.length) {
            return { message: "User not Exists with this Email" }
        }

        //verify using password of bcrypt in DB
        const isValid = await this.bcryptService.verifyPassword(body.password, isUserEmailExists[0]?.password);
        if (!isValid) {
            return { message: "Password not matched or modified" }
        }

        // generate token for accessing resources
        const token = await this.authService.generateJwtToken(isUserEmailExists[0]);

        return {
            username: isUserEmailExists[0].username,
            email: isUserEmailExists[0].email,
            access_token: token,
            message: "Login Success"
        }
    }
}