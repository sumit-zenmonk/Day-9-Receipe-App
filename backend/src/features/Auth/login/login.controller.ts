import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./login.dto";

@Controller('/Login')
export class LoginController {
    constructor(private readonly LoginService: LoginService) { }

    @Post()
    async LoginUser(@Body() body: LoginDto) {
        return this.LoginService.loginUser(body);
    }
}