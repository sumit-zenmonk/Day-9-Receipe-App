import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { LoginController } from "./login.controller";
import { AuthService } from "src/infrastructure/services/auth.service";
import { BcryptService } from "src/infrastructure/services/bcrypt.service";

@Module({
    imports: [],
    controllers: [LoginController],
    providers: [LoginService, UserRepository, AuthService, BcryptService],
    exports: [LoginModule],
})

export class LoginModule { }