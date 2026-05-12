import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { request } from "http";
import { AuthDTO } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post("/register")
    register(@Body() authDTO: AuthDTO) {
        return this.authService.register(authDTO);
    }

    // register(@Req() request: Request) {
    //     console.log(request.body);
    //     return this.authService.register();
    // }

    // register(
    //     @Body('email') email: string,
    //     @Body('password') password: string
    // ){
    //     console.log(`email: ${email}, password: ${password}`);
    //     console.log(`Type of email: ${typeof email}, type of password: ${typeof password}`);
    //     return this.authService.register();
    // }

    @Post("/login")
    login(@Body() authDTO: AuthDTO) {
        return this.authService.login(authDTO);
    }
}