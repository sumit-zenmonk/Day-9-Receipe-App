import { UserRepository } from "src/infrastructure/repository/user.repo";
import { RegisterDto } from "./register.dto";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/infrastructure/services/auth.service";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";

@Injectable()
export class RegisterService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly authService: AuthService,
        private readonly bcryptService: BcryptService
    ) { }

    async registerUser(body: RegisterDto) {
        //check if already exists using this email
        const isUserExists = await this.userRepo.findByEmail(body.email);
        if (isUserExists.length) {
            return { message: "User Already Exists with this Email" }
        }

        //hashed password using bcrypt
        body.password = await this.bcryptService.hashPassword(body.password);

        //register user in DB
        const RegisteredUser = await this.userRepo.register(body);

        // generate token for accessing resources
        const token = await this.authService.generateJwtToken(RegisteredUser);
        return {
            username: RegisteredUser.username,
            email: RegisteredUser.email,
            message: "Registered User",
            access_token: token,
        }
    }
}